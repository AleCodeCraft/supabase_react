import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../../features/auth/supabaseClient'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ CORRETTO - Memoizzazione valori costosi per evitare calcoli ripetuti
  const isAuthenticated = useMemo(() => !!user, [user])
  const userRole = useMemo(() => user?.user_metadata?.role || 'user', [user])
  const userEmail = useMemo(() => user?.email || '', [user])
  const userId = useMemo(() => user?.id || null, [user])

  // Controlla la sessione attuale
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
      } catch (error) {
        console.error('Errore nel recupero sessione:', error)
        setLoading(false)
      }
    }

    getSession()
  }, [])

  // Ascolta i cambiamenti di autenticazione
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // ✅ CORRETTO - Login con email e password (memoizzato)
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ CORRETTO - Login con Google (memoizzato)
  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ CORRETTO - Registrazione (memoizzata)
  const signUp = useCallback(async (email, password, userData = {}) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ CORRETTO - Logout (memoizzato)
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    session,
    loading,
    login,
    loginWithGoogle,
    signUp,
    logout,
    isAuthenticated,
    userRole,
    userEmail,
    userId
  }
}
