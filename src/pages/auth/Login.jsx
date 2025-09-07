import React, { useState, memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

// ✅ CORRETTO - Componente Login memoizzato per evitare re-render
const Login = memo(() => {
  const { login, loginWithGoogle, loading, session } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // ✅ CORRETTO - Reindirizzamento automatico quando la sessione è attiva
  useEffect(() => {
    if (session) {
      console.log('Login: Sessione attiva, reindirizzamento a /')
      navigate('/', { replace: true })
    }
  }, [session, navigate])

  // ✅ CORRETTO - Callback memoizzati per evitare re-render
  const handleLogin = useCallback(async (event) => {
    event.preventDefault()
    setMessage('')

    const result = await login(email, password)
    if (result.success) {
      setMessage('Login riuscito! Reindirizzamento...')
    } else {
      setMessage(`Errore: ${result.error}`)
    }
  }, [login, email, password])

  const handleGoogleLogin = useCallback(async () => {
    setMessage('')
    const result = await loginWithGoogle()
    if (!result.success) {
      setMessage(`Errore Google: ${result.error}`)
    }
  }, [loginWithGoogle])

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), [])
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [])

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-600/20">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Benvenuto
          </h1>
          <p className="text-text-secondary text-center mb-8 text-lg">
            Accedi al tuo account
          </p>
          
          {message && (
            <div className={`p-4 rounded-2xl mb-6 text-sm ${
              message.includes('Errore') 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : 'bg-gold-600/10 text-gold-600 border border-gold-600/20'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="La tua email"
                value={email}
                required={true}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="La tua password"
                value={password}
                required={true}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Button 
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Caricamento...' : 'Accedi'}
              </Button>
            </div>
          </form>

          {/* Separatore */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-surface-tertiary"></div>
            <span className="px-4 text-text-muted text-sm">oppure</span>
            <div className="flex-1 border-t border-surface-tertiary"></div>
          </div>

          {/* Bottone Google */}
          <Button 
            variant="secondary"
            size="lg"
            className="w-full bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-3"
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Accedi con Google</span>
          </Button>

          <div className="mt-8 text-center">
            <p className="text-text-secondary mb-4">
              Non hai ancora un account?
            </p>
            <a 
              href="/signup"
              className="inline-block"
            >
              <Button variant="secondary" size="md">
                Registrati
              </Button>
            </a>
            
            <div className="mt-4">
              <a 
                href="/forgot-password"
                className="text-gold-600 hover:text-gold-600/80 text-sm underline underline-offset-2 transition-colors"
              >
                Ho dimenticato la password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
Login.displayName = 'Login'

export default Login