import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function SignUp({ onSwitchToLogin }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    // Validazione password
    if (password !== confirmPassword) {
      setMessage('Le password non coincidono')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('La password deve essere di almeno 6 caratteri')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName || 'Nome Utente',
            avatar_url: null
          }
        }
      })
      
      if (error) {
        setMessage(`Errore: ${error.message}`)
      } else {
        setMessage('Registrazione riuscita! Controlla la tua email per confermare l\'account.')
        // Reset form
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setFullName('')
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
        <h1 className="header">Registrazione</h1>
        <p className="description">Crea il tuo account</p>
        
        {message && (
          <div className={message.includes('Errore') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}

        <form className="form-widget" onSubmit={handleSignUp}>
          <div>
            <input
              className="inputField"
              type="text"
              placeholder="Nome completo"
              value={fullName}
              required={true}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Conferma password"
              value={confirmPassword}
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Caricamento...</span> : <span>Registrati</span>}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ color: '#b0bec5', marginBottom: '16px' }}>
            Hai già un account?
          </p>
          <button 
            className="button" 
            type="button" 
            onClick={onSwitchToLogin}
            style={{ 
              background: 'transparent', 
              color: '#61dafb', 
              border: '2px solid #61dafb',
              padding: '12px 24px',
              fontSize: '0.95rem'
            }}
          >
            Accedi
          </button>
        </div>
      </div>
    </div>
  )
}
