import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary ha catturato un errore:', error, errorInfo)
    
    // Qui puoi inviare l'errore a un servizio di monitoring
    // come Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#1a2332',
          color: '#ffffff'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            😕 Qualcosa è andato storto
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
            Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#61dafb',
              color: '#1a2332',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4fa8c7'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#61dafb'}
          >
            Ricarica Pagina
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
