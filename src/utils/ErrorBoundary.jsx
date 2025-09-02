import React from 'react'
import { createErrorBoundary } from './errorHandler'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorId: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Utilizza la nuova utility di logging
    const errorLog = createErrorBoundary(error, errorInfo)
    
    this.setState({ 
      errorId: errorLog.timestamp,
      error: error 
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-950 text-text-primary flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gold-400">
              Qualcosa è andato storto
            </h1>
            
            <p className="text-lg text-text-primary/70">
              Si è verificato un errore imprevisto. Il nostro team è stato notificato.
            </p>
            
            {this.state.errorId && (
              <div className="bg-dark-900 p-4 rounded-lg text-sm text-text-primary/50">
                ID Errore: {this.state.errorId}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gold-400 hover:bg-gold-300 text-dark-950 font-semibold rounded-2xl transition-all duration-300"
              >
                Ricarica Pagina
              </button>
              
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorId: null })}
                className="px-8 py-4 bg-dark-900 hover:bg-dark-800 text-text-primary font-semibold rounded-2xl border border-gold-400/20 transition-all duration-300"
              >
                Riprova
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
