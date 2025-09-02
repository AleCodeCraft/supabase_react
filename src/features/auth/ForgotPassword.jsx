import { useState, memo, useCallback } from 'react'
import { supabase } from './supabaseClient'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Input'
import { validateEmail } from '../../utils/validationUtils'
import { createRetryableOperation } from '../../utils/retryUtils'
import { AppError, errorCodes } from '../../utils/errorHandler'

const ForgotPassword = memo(() => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [emailSent, setEmailSent] = useState(false)

  // Operazione di reset password con retry automatico
  const retryableResetPassword = useCallback(
    createRetryableOperation(async (email) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) throw new AppError(error.message, errorCodes.AUTH_ERROR)
      return { data, error: null }
    }, { maxRetries: 3, timeout: 15000 })
  , [])

  const handleResetPassword = useCallback(async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setErrors({})

    // Validazione email
    const validationResult = validateEmail(email)
    if (!validationResult.isValid) {
      setErrors({ email: validationResult.error })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await retryableResetPassword(email)
      
      if (error) throw error
      
      setEmailSent(true)
      setMessage('Email di reset inviata! Controlla la tua casella di posta.')
      
    } catch (error) {
      let errorMessage = 'Errore imprevisto durante l\'invio dell\'email di reset'
      
      if (error instanceof AppError) {
        errorMessage = error.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setMessage(errorMessage)
      console.error('Errore reset password:', error)
    } finally {
      setLoading(false)
    }
  }, [email, retryableResetPassword])

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), [])

  const handleBackToLogin = useCallback(() => {
    window.history.back()
  }, [])

  if (emailSent) {
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
                Email Inviata!
              </h1>
              
              <p className="text-text-primary/70 mb-8 text-lg">
                Abbiamo inviato un link per il reset della password a:
              </p>
              
              <p className="text-gold-400 font-medium mb-8 break-all">
                {email}
              </p>
              
              <p className="text-text-primary/60 mb-8 text-sm">
                Controlla la tua casella di posta e clicca sul link per reimpostare la password.
                Se non trovi l'email, controlla anche la cartella spam.
              </p>
              
              <Button 
                variant="primary"
                size="lg"
                className="w-full mb-4"
                onClick={handleBackToLogin}
              >
                Torna al Login
              </Button>
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
            Reset Password
          </h1>
          <p className="text-text-primary/70 text-center mb-8 text-lg">
            Inserisci la tua email per ricevere un link di reset
          </p>
          
          {message && (
            <div className={`p-4 rounded-2xl mb-6 text-sm ${
              message.includes('Errore') 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : 'bg-green-500/10 text-green-400 border border-green-400/20'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="La tua email"
                value={email}
                required={true}
                onChange={handleEmailChange}
                error={errors.email}
              />
            </div>
            <div>
              <Button 
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Invio in corso...' : 'Invia Email di Reset'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Button 
              variant="secondary" 
              size="md"
              onClick={handleBackToLogin}
            >
              Torna al Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

ForgotPassword.displayName = 'ForgotPassword'

export default ForgotPassword
