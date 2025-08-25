import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth({ onSwitchToSignUp }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      
      if (error) {
        setMessage(`Errore: ${error.message}`)
      } else {
        setMessage('Login riuscito! Reindirizzamento...')
        // Il componente App si aggiornerà automaticamente
      }
    } catch (err) {
      setMessage(`Errore imprevisto: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      
      if (error) {
        setMessage(`Errore Google: ${error.message}`)
        setLoading(false)
      }
      // Se non c'è errore, l'utente verrà reindirizzato automaticamente
    } catch (err) {
      setMessage(`Errore imprevisto: ${err.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Benvenuto</h1>
        <p className="description">Accedi al tuo account</p>
        
        {message && (
          <div className={message.includes('Errore') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}

        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="La tua email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="La tua password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Caricamento...</span> : <span>Accedi</span>}
            </button>
          </div>
        </form>

        {/* Separatore */}
        <div className="separator">
          <span>oppure</span>
        </div>

        {/* Bottone Google */}
        <button 
          className="google-button" 
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Accedi con Google</span>
        </button>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ color: '#b0bec5', marginBottom: '16px' }}>
            Non hai ancora un account?
          </p>
          <button 
            className="button" 
            type="button" 
            onClick={onSwitchToSignUp}
            style={{ 
              background: 'transparent', 
              color: '#61dafb', 
              border: '2px solid #61dafb',
              padding: '12px 24px',
              fontSize: '0.95rem'
            }}
          >
            Registrati
          </button>
        </div>
      </div>
    </div>
  )
}