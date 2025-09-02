// Utility per retry automatico e gestione robusta delle operazioni asincrone

export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries) {
        throw new Error(`Operazione fallita dopo ${maxRetries} tentativi: ${error.message}`)
      }
      
      // Delay esponenziale
      const waitTime = delay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }
}

export const withTimeout = async (promise, timeoutMs = 10000) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout operazione')), timeoutMs)
  })
  
  return Promise.race([promise, timeoutPromise])
}

export const createRetryableOperation = (operation, options = {}) => {
  const { maxRetries = 3, delay = 1000, timeout = 10000 } = options
  
  return async (...args) => {
    const wrappedOperation = () => withTimeout(operation(...args), timeout)
    return retryOperation(wrappedOperation, maxRetries, delay)
  }
}
