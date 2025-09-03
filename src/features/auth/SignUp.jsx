import { useState, memo, useCallback, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Input'
import { validateForm, validateEmail, validatePassword, validateFullName } from '../../utils/validationUtils'
import { createRetryableOperation } from '../../utils/retryUtils'
import { AppError, errorCodes } from '../../utils/errorHandler'

const SignUp = memo(() => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [cooldownTime, setCooldownTime] = useState(0)

  // Validatori per il form
  const validators = useMemo(() => ({
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (value) => {
      if (value !== password) {
        return { isValid: false, error: 'Le password non coincidono' }
      }
      return validatePassword(value)
    },
    fullName: validateFullName
  }), [password])

  // Operazione di registrazione con retry automatico
  const retryableSignUp = useMemo(() => 
    createRetryableOperation(async (email, password, userData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData }
      })
      
      if (error) throw new AppError(error.message, errorCodes.AUTH_ERROR)
      return { data, error: null }
    }, { maxRetries: 3, timeout: 15000 })
  , [])

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setErrors({})

    // Validazione form
    const formData = { email, password, confirmPassword, fullName }
    const validationResult = validateForm(formData, validators)
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      setLoading(false)
      return
    }

    try {
      const userData = {
        full_name: fullName || 'Nome Utente',
        avatar_url: null
      }
      
      const { data, error } = await retryableSignUp(email, password, userData)
      
      if (error) throw error
      
             // Registrazione riuscita - reindirizza alla dashboard
       setMessage('Registrazione completata! Reindirizzamento...')
      
      // Reset form
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFullName('')
      setErrors({})
      
      // Reindirizza alla dashboard dopo 1.5 secondi
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
      
    } catch (error) {
      let errorMessage = 'Errore imprevisto durante la registrazione'
      
      // Gestione specifica per errori di rate limiting di Supabase
      if (error.message && error.message.includes('40 seconds')) {
        errorMessage = 'Troppi tentativi di registrazione. Attendi 40 secondi prima di riprovare.'
        setCooldownTime(40) // Imposta il cooldown a 40 secondi
      } else if (error.message && error.message.includes('already registered') || 
                 error.message && error.message.includes('User already registered')) {
        errorMessage = 'Questa email è già registrata. Prova ad accedere invece.'
      } else if (error.message && error.message.includes('Invalid email')) {
        errorMessage = 'Formato email non valido.'
      } else if (error.message && error.message.includes('Password should be at least')) {
        errorMessage = 'La password deve essere di almeno 6 caratteri.'
      } else if (error instanceof AppError) {
        errorMessage = error.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
             if (error.message && error.message.includes('40 seconds')) {
         setMessage(`${errorMessage} (${cooldownTime}s rimanenti)`)
       } else {
         setMessage(errorMessage)
       }
      
      // Log dell'errore per debugging
      console.error('Errore registrazione:', error)
    } finally {
      setLoading(false)
    }
  }, [email, password, confirmPassword, fullName, validators, retryableSignUp])

  // Gestione countdown per cooldown
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => {
                 setCooldownTime(prev => {
           if (prev <= 1) {
             setMessage('Puoi riprovare la registrazione ora.')
             return 0
           }
           setMessage(`Troppi tentativi di registrazione. Attendi ${prev - 1} secondi prima di riprovare.`)
           return prev - 1
         })
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [cooldownTime])

  const handleFullNameChange = useCallback((e) => setFullName(e.target.value), [])
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), [])
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [])
  const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), [])

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-green-600/20">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Registrazione
          </h1>
          <p className="text-text-secondary text-center mb-8 text-lg">
            Crea il tuo account
          </p>
                     <p className="text-text-muted text-center mb-6 text-sm">
             Accesso immediato senza conferma email
           </p>
          
                     {message && (
             <div className={`p-4 rounded-2xl mb-6 text-sm ${
               message.includes('Troppi tentativi') || message.includes('Attendi')
                 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
                 : message.includes('Errore') || message.includes('già registrata') || message.includes('non valido')
                 ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                 : 'bg-green-500/10 text-green-400 border border-green-400/20'
             }`}>
               {message}
             </div>
           )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Nome completo"
                value={fullName}
                required={true}
                onChange={handleFullNameChange}
                validation="fullName"
                showValidation={true}
                error={errors.fullName}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="La tua email"
                value={email}
                required={true}
                onChange={handleEmailChange}
                validation="email"
                showValidation={true}
                error={errors.email}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
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
                placeholder="Conferma password"
                value={confirmPassword}
                required={true}
                onChange={handleConfirmPasswordChange}
                validation="confirmPassword"
                showValidation={true}
                error={errors.confirmPassword}
              />
            </div>
            <div>
              <Button 
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading || cooldownTime > 0}
              >
                {loading ? 'Caricamento...' : cooldownTime > 0 ? `Attendi ${cooldownTime}s` : 'Registrati'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-secondary mb-4">
              Hai già un account?
            </p>
            <a 
              href="/login"
              className="inline-block"
            >
              <Button variant="secondary" size="md">
                Accedi
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})

SignUp.displayName = 'SignUp'

export default SignUp
