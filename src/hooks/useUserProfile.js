import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../pages/auth/supabaseClient'
import { useAuth } from './useAuth'

export const useUserProfile = () => {
  const { user, userId } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carica il profilo utente
  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // Profilo non trovato, crea uno nuovo
          console.log('Profilo non trovato, creazione automatica...')
          await createProfile()
          return
        }
        throw fetchError
      }

      setProfile(data)
      console.log('Profilo caricato:', data)
    } catch (err) {
      console.error('Errore nel caricamento profilo:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Crea un nuovo profilo
  const createProfile = useCallback(async () => {
    if (!userId || !user) return

    try {
      const profileData = {
        user_id: userId,
        display_name: user.user_metadata?.display_name || '',
        full_name: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
        username: user.email?.split('@')[0] || `user_${userId.slice(0, 8)}`
      }

      const { data, error: createError } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single()

      if (createError) throw createError

      setProfile(data)
    } catch (err) {
      console.error('Errore nella creazione profilo:', err)
      setError(err.message)
    }
  }, [userId, user])

  // Aggiorna il profilo
  const updateProfile = useCallback(async (updates) => {
    if (!userId || !profile) return { success: false, error: 'Profilo non trovato' }

    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (updateError) {
        // Gestione errori specifici per username
        if (updateError.code === '23505' && updateError.message.includes('username')) {
          throw new Error('Username già in uso. Scegli un altro username.')
        }
        if (updateError.code === '23514') {
          throw new Error('Username non valido. Usa solo lettere, numeri e underscore.')
        }
        throw updateError
      }

      setProfile(data)
      return { success: true, data }
    } catch (err) {
      console.error('Errore nell\'aggiornamento profilo:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [userId, profile])

  // Aggiorna username con controlli specifici
  const updateUsername = useCallback(async (newUsername) => {
    if (!userId) return { success: false, error: 'Utente non autenticato' }

    try {
      setLoading(true)
      setError(null)

      // Validazione lato client
      if (!newUsername || newUsername.length < 3) {
        return { success: false, error: 'Username troppo corto. Minimo 3 caratteri.' }
      }
      if (newUsername.length > 50) {
        return { success: false, error: 'Username troppo lungo. Massimo 50 caratteri.' }
      }
      if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
        return { success: false, error: 'Username può contenere solo lettere, numeri e underscore.' }
      }

      console.log('Tentativo aggiornamento username:', { userId, newUsername })

      // Prova prima con la funzione RPC
      try {
        const { data, error } = await supabase.rpc('update_username', {
          target_user_id: userId,
          new_username: newUsername
        })

        if (error) throw error

        if (data && data.success) {
          console.log('Username aggiornato via RPC:', data)
          await fetchProfile()
          return { success: true, message: data.message }
        } else {
          console.log('RPC fallito, provo aggiornamento diretto')
          throw new Error(data?.error || 'RPC fallito')
        }
      } catch (rpcError) {
        console.log('RPC non disponibile, uso aggiornamento diretto:', rpcError.message)
        
        // Fallback: aggiornamento diretto
        const { data, error } = await supabase
          .from('user_profiles')
          .update({ 
            username: newUsername,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .select()

        if (error) {
          // Gestione errori specifici per username
          if (error.code === '23505' && error.message.includes('username')) {
            throw new Error('Username già in uso. Scegli un altro username.')
          }
          if (error.code === '23514') {
            throw new Error('Username non valido. Usa solo lettere, numeri e underscore.')
          }
          throw error
        }

        if (data && data.length > 0) {
          console.log('Username aggiornato direttamente:', data[0])
          setProfile(data[0])
          return { success: true, message: 'Username aggiornato con successo!' }
        } else {
          throw new Error('Nessun profilo trovato per l\'aggiornamento')
        }
      }
    } catch (err) {
      console.error('Errore nell\'aggiornamento username:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [userId, fetchProfile])

  // Verifica disponibilità username
  const checkUsernameAvailability = useCallback(async (username) => {
    if (!username || username.length < 3) {
      return { success: false, error: 'Username troppo corto' }
    }

    try {
      const { data, error } = await supabase.rpc('check_username_availability', {
        check_username: username
      })

      if (error) throw error

      return { 
        success: true, 
        available: data,
        message: data ? 'Username disponibile' : 'Username già in uso'
      }
    } catch (err) {
      console.error('Errore nel controllo username:', err)
      return { success: false, error: err.message }
    }
  }, [])

  // Aggiorna i punti
  const updatePoints = useCallback(async (pointsToAdd) => {
    if (!profile) return { success: false, error: 'Profilo non trovato' }

    const newPoints = (profile.points || 0) + pointsToAdd
    const newLevel = Math.floor(newPoints / 100) + 1 // 100 punti per livello

    return await updateProfile({
      points: newPoints,
      level: newLevel
    })
  }, [profile, updateProfile])

  // Ottieni la classifica
  const getLeaderboard = useCallback(async (limit = 10) => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .limit(limit)

      if (error) throw error
      return { success: true, data }
    } catch (err) {
      console.error('Errore nel caricamento classifica:', err)
      return { success: false, error: err.message }
    }
  }, [])

  // Sottoscrivi ai cambiamenti del profilo
  useEffect(() => {
    if (!userId) return

    fetchProfile()

    // Sottoscrizione real-time
    const channel = supabase
      .channel('user_profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Profilo aggiornato:', payload)
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setProfile(payload.new)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchProfile])

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateUsername,
    checkUsernameAvailability,
    updatePoints,
    getLeaderboard,
    refreshProfile: fetchProfile
  }
}
