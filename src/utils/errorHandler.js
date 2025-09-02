// Gestione centralizzata degli errori e logging strutturato

export class AppError extends Error {
  constructor(message, code, details = {}) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

export const errorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

export const logError = (error, context = {}) => {
  const errorLog = {
    message: error.message,
    code: error.code || errorCodes.UNKNOWN_ERROR,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
    userAgent: navigator.userAgent,
    url: window.location.href
  }
  
  // Log in console per sviluppo
  if (process.env.NODE_ENV === 'development') {
    console.error('Errore applicazione:', errorLog)
  }
  
  // Qui puoi inviare l'errore a servizi di monitoring come Sentry
  // sentry.captureException(error, { extra: errorLog })
  
  return errorLog
}

export const handleApiError = (error) => {
  if (error.code === 'NETWORK_ERROR') {
    return {
      userMessage: 'Errore di connessione. Verifica la tua connessione internet.',
      shouldRetry: true,
      retryDelay: 5000
    }
  }
  
  if (error.code === 'TIMEOUT_ERROR') {
    return {
      userMessage: 'Operazione troppo lenta. Riprova tra qualche istante.',
      shouldRetry: true,
      retryDelay: 3000
    }
  }
  
  if (error.code === 'AUTH_ERROR') {
    return {
      userMessage: 'Sessione scaduta. Effettua nuovamente l\'accesso.',
      shouldRetry: false,
      redirectTo: '/login'
    }
  }
  
  return {
    userMessage: 'Si è verificato un errore imprevisto. Riprova più tardi.',
    shouldRetry: false
  }
}

export const createErrorBoundary = (error, errorInfo) => {
  logError(error, { errorInfo, componentStack: errorInfo.componentStack })
  
  // Invia metriche di errore
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false
    })
  }
}
