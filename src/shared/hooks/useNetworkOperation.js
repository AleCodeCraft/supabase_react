import { useState, useCallback, useRef, useEffect } from 'react'
import { createRetryableOperation, withTimeout } from '../../utils/retryUtils'
import { checkNetworkStatus } from '../../utils/networkUtils'
import { AppError, errorCodes, handleApiError } from '../../utils/errorHandler'

export const useNetworkOperation = (operation, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 10000,
    autoRetry = true,
    onSuccess = null,
    onError = null
  } = options

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  
  const abortControllerRef = useRef(null)
  const retryTimeoutRef = useRef(null)

  // Crea operazione con retry automatico
  const retryableOperation = useCallback(
    createRetryableOperation(operation, { maxRetries, delay: retryDelay, timeout }),
    [operation, maxRetries, retryDelay, timeout]
  )

  // Reset stato
  const resetState = useCallback(() => {
    setError(null)
    setData(null)
    setRetryCount(0)
  }, [])

  // Esegui operazione
  const execute = useCallback(async (...args) => {
    if (!checkNetworkStatus()) {
      const networkError = new AppError('Nessuna connessione internet', errorCodes.NETWORK_ERROR)
      setError(networkError)
      onError?.(networkError)
      return { success: false, error: networkError }
    }

    setLoading(true)
    setError(null)
    
    // Crea nuovo abort controller
    abortControllerRef.current = new AbortController()
    
    try {
      const result = await retryableOperation(...args)
      
      setData(result)
      setLoading(false)
      onSuccess?.(result)
      
      return { success: true, data: result }
      
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError(error.message, errorCodes.UNKNOWN_ERROR)
      
      setError(appError)
      setLoading(false)
      
      const errorInfo = handleApiError(appError)
      
      // Retry automatico se abilitato
      if (autoRetry && errorInfo.shouldRetry && retryCount < maxRetries) {
        setRetryCount(prev => prev + 1)
        
        retryTimeoutRef.current = setTimeout(() => {
          execute(...args)
        }, errorInfo.retryDelay || retryDelay)
      }
      
      onError?.(appError)
      return { success: false, error: appError }
    }
  }, [retryableOperation, autoRetry, maxRetries, retryCount, retryDelay, onSuccess, onError])

  // Cancella operazione
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
    setLoading(false)
  }, [])

  // Retry manuale
  const retry = useCallback((...args) => {
    resetState()
    return execute(...args)
  }, [execute, resetState])

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  return {
    loading,
    error,
    data,
    retryCount,
    execute,
    cancel,
    retry,
    resetState,
    isOnline: checkNetworkStatus()
  }
}
