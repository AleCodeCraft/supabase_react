import { useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../features/auth/supabaseClient'

// ✅ CORRETTO - Memoization per evitare re-render non necessari
const ProtectedRoute = memo(({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Controlla la sessione attuale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
      
      if (!session) {
        navigate('/login')
      }
    })

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
      
      if (!session) {
        navigate('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="text-center space-y-4 md:space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-400 mx-auto"></div>
          <p className="text-gold-400 text-lg">Verifica autenticazione...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Il redirect avverrà automaticamente
  }

  return children
})

// ✅ CORRETTO - Nome del componente per debugging
ProtectedRoute.displayName = 'ProtectedRoute'

export default ProtectedRoute
