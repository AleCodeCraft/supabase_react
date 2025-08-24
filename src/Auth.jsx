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