import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { checkApiHealth, monitorNetworkQuality } from '../../utils/networkUtils'

const HealthMonitor = memo(() => {
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: navigator.onLine,
    lastCheck: Date.now(),
    apiHealth: null
  })

  const [showDetails, setShowDetails] = useState(false)
  const healthIntervalRef = useRef(null)
  const isVisibleRef = useRef(true)

  // Check salute API - ridotto a ogni 5 minuti per performance
  const checkHealth = useCallback(async () => {
    // Non fare check se il componente non è visibile
    if (!isVisibleRef.current) return
    
    try {
      const health = await checkApiHealth('/api/health', 3000) // Timeout ridotto
      setNetworkStatus(prev => ({
        ...prev,
        apiHealth: health,
        lastCheck: Date.now()
      }))
    } catch (error) {
      setNetworkStatus(prev => ({
        ...prev,
        apiHealth: { isHealthy: false, error: error.message },
        lastCheck: Date.now()
      }))
    }
  }, [])

  // Monitora qualità rete - ottimizzato per performance
  useEffect(() => {
    const cleanup = monitorNetworkQuality()
    
    const handleOnline = () => setNetworkStatus(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setNetworkStatus(prev => ({ ...prev, isOnline: false }))
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Check periodico salute API ogni 5 minuti invece di 1 minuto
    healthIntervalRef.current = setInterval(checkHealth, 300000) // 5 minuti
    
    // Check iniziale solo se necessario
    if (networkStatus.isOnline) {
      checkHealth()
    }
    
    // Intersection Observer per ridurre check quando non visibile
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !healthIntervalRef.current) {
          healthIntervalRef.current = setInterval(checkHealth, 300000)
        } else if (!entry.isIntersecting && healthIntervalRef.current) {
          clearInterval(healthIntervalRef.current)
          healthIntervalRef.current = null
        }
      },
      { threshold: 0.1 }
    )
    
    const monitorElement = document.querySelector('#health-monitor')
    if (monitorElement) {
      observer.observe(monitorElement)
    }
    
    return () => {
      cleanup()
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (healthIntervalRef.current) {
        clearInterval(healthIntervalRef.current)
      }
      observer.disconnect()
    }
  }, [checkHealth, networkStatus.isOnline])

  const getStatusColor = (isHealthy) => {
    return isHealthy ? 'text-green-400' : 'text-red-400'
  }

  const getStatusIcon = (isHealthy) => {
    return isHealthy ? '●' : '●'
  }

  if (!showDetails) {
    return (
      <div id="health-monitor" className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDetails(true)}
          className={`p-2 rounded-full bg-dark-900 border-2 ${
            networkStatus.isOnline ? 'border-green-400' : 'border-red-400'
          } text-white hover:bg-dark-800 transition-colors`}
          title="Stato connessione"
        >
          <span className={`text-xs ${getStatusColor(networkStatus.isOnline)}`}>
            {getStatusIcon(networkStatus.isOnline)}
          </span>
        </button>
      </div>
    )
  }

  return (
    <div id="health-monitor" className="fixed bottom-4 right-4 z-50">
      <div className="bg-dark-900 border border-gold-400/20 rounded-lg p-4 shadow-2xl max-w-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gold-400">Stato Sistema</h3>
          <button
            onClick={() => setShowDetails(false)}
            className="text-text-primary/50 hover:text-text-primary"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-text-primary/70">Rete:</span>
            <span className={`${getStatusColor(networkStatus.isOnline)}`}>
              {networkStatus.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          {networkStatus.apiHealth && (
            <div className="flex items-center justify-between">
              <span className="text-text-primary/70">API:</span>
              <span className={`${getStatusColor(networkStatus.apiHealth.isHealthy)}`}>
                {networkStatus.apiHealth.isHealthy ? 'OK' : 'Errore'}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-text-primary/70">Ultimo check:</span>
            <span className="text-text-primary/50">
              {new Date(networkStatus.lastCheck).toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        <button
          onClick={checkHealth}
          className="w-full mt-3 px-3 py-2 bg-gold-400 hover:bg-gold-300 text-dark-950 text-xs font-medium rounded transition-colors"
        >
          Ricontrolla
        </button>
      </div>
    </div>
  )
})

HealthMonitor.displayName = 'HealthMonitor'

export default HealthMonitor
