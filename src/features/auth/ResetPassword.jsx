import { useState, memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Input'
import { validatePassword } from '../../utils/validationUtils'
import { createRetryableOperation } from '../../utils/retryUtils'
import { AppError, errorCodes } from '../../utils/errorHandler'

const ResetPassword = memo(() => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [passwordReset, setPasswordReset] = useState(false)

  // Verifica se l'utente ha un token di reset valido
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setMessage('Link di reset non valido o scaduto. Richiedi un nuovo reset.')
      }
    }
    
    checkSession()
  }, [])

  // Operazione di aggiornamento password con retry automatico
  const retryableUpdatePassword = useCallback(
    createRetryableOperation(async (password) => {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      })
      
      if (error) throw new AppError(error.message, errorCodes.AUTH_ERROR)
      return { data, error: null }
    }, { maxRetries: 3, timeout: 15000 })
  , [])

  const handlePasswordReset = useCallback(async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setErrors({})

    // Validazione password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      setErrors({ password: passwordValidation.error })
      setLoading(false)
      return
    }
    
    // Mostra suggerimenti per migliorare la password (non bloccanti)
    if (passwordValidation.suggestions && passwordValidation.suggestions.length > 0) {
      console.log('Suggerimenti password:', passwordValidation.suggestions)
    }

    // Validazione conferma password
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Le password non coincidono' })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await retryableUpdatePassword(password)
      
      if (error) throw error
      
      setPasswordReset(true)
      setMessage('Password aggiornata con successo!')
      
      // Reindirizza alla dashboard dopo 2 secondi
      setTimeout(() => {
        navigate('/')
      }, 2000)
      
    } catch (error) {
      let errorMessage = 'Errore imprevisto durante l\'aggiornamento della password'
      
      if (error instanceof AppError) {
        errorMessage = error.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setMessage(errorMessage)
      console.error('Errore aggiornamento password:', error)
    } finally {
      setLoading(false)
    }
  }, [password, confirmPassword, retryableUpdatePassword, navigate])

  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [])
  const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), [])

  if (passwordReset) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-400/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
                Password Aggiornata!
              </h1>
              
              <p className="text-text-primary/70 mb-8 text-lg">
                La tua password è stata aggiornata con successo.
              </p>
              
              <p className="text-text-primary/60 mb-8 text-sm">
                Reindirizzamento alla dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-400/20">
          <h1 className="text-3xl md:text-4xl font-bold text-gold-400 text-center mb-4">
            Nuova Password
          </h1>
          <p className="text-text-primary/70 text-center mb-8 text-lg">
            Imposta la tua nuova password
          </p>
          
          {message && (
            <div className={`p-4 rounded-2xl mb-6 text-sm ${
              message.includes('Errore') || message.includes('non valido') || message.includes('scaduto')
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : 'bg-green-500/10 text-green-400 border border-green-400/20'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <Input
                type="password"
                placeholder="Nuova password"
                value={password}
                required={true}
                onChange={handlePasswordChange}
                validation="password"
                showValidation={true}
                error={errors.password}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Conferma nuova password"
                value={confirmPassword}
                required={true}
                onChange={handleConfirmPasswordChange}
                error={errors.confirmPassword}
              />
            </div>
            <div>
              <Button 
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Aggiornamento...' : 'Aggiorna Password'}
              </Button>
            </div>
          </form>


        </div>
      </div>
    </div>
  )
})

ResetPassword.displayName = 'ResetPassword'

export default ResetPassword
