// Gestione robusta delle operazioni di rete e health check - OTTIMIZZATO PER PERFORMANCE

export const checkNetworkStatus = () => {
  return navigator.onLine
}

export const checkApiHealth = async (endpoint, timeout = 3000) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    const response = await fetch(endpoint, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-cache'
    })
    
    clearTimeout(timeoutId)
    
    return {
      isHealthy: response.ok,
      status: response.status,
      responseTime: Date.now()
    }
  } catch (error) {
    return {
      isHealthy: false,
      error: error.message,
      timestamp: Date.now()
    }
  }
}

export const createNetworkAwareFetch = (baseUrl, options = {}) => {
  const { timeout = 8000, retries = 2, retryDelay = 1000 } = options // Ridotti per performance
  
  return async (endpoint, fetchOptions = {}) => {
    if (!checkNetworkStatus()) {
      throw new Error('Nessuna connessione internet disponibile')
    }
    
    const url = `${baseUrl}${endpoint}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new Error('Timeout richiesta')
      }
      
      throw error
    }
  }
}

export const monitorNetworkQuality = () => {
  let lastCheck = Date.now()
  let connectionCount = 0
  let disconnectionCount = 0
  
  const updateConnectionStatus = () => {
    const now = Date.now()
    const isOnline = navigator.onLine
    
    if (isOnline) {
      connectionCount++
    } else {
      disconnectionCount++
    }
    
    lastCheck = now
    
    // Invia metriche solo se disponibili e non troppo frequentemente
    if (typeof window !== 'undefined' && window.gtag && (connectionCount + disconnectionCount) % 10 === 0) {
      window.gtag('event', 'network_status', {
        is_online: isOnline,
        connection_count: connectionCount,
        disconnection_count: disconnectionCount,
        uptime_percentage: (connectionCount / (connectionCount + disconnectionCount)) * 100
      })
    }
  }
  
  window.addEventListener('online', updateConnectionStatus)
  window.addEventListener('offline', updateConnectionStatus)
  
  // Check periodico ogni 2 minuti invece di 30 secondi per performance
  const intervalId = setInterval(updateConnectionStatus, 120000)
  
  return () => {
    window.removeEventListener('online', updateConnectionStatus)
    window.removeEventListener('offline', updateConnectionStatus)
    clearInterval(intervalId)
  }
}
