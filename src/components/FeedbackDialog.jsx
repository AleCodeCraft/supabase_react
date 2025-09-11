import React, { useState, memo, useCallback } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { supabase } from '../pages/auth/supabaseClient'
import { useAuth } from '../hooks/useAuth'

// ✅ CORRETTO - Componente FeedbackDialog memoizzato
const FeedbackDialog = memo(({ isOpen, onClose, type, onSubmit }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Reset form quando si apre/chiude
  React.useEffect(() => {
    if (isOpen) {
      setMessage('')
      setLoading(false)
    }
  }, [isOpen])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      // Salva il feedback nel database - VERSIONE SEMPLIFICATA
      const { data, error } = await supabase
        .from('feedback')
        .insert([
          {
            user_id: user?.id,
            type: type,
            message: message.trim()
          }
        ])
        .select()

      if (error) throw error

      // Chiama la funzione onSubmit per notificare il parent
      await onSubmit(message.trim(), data[0])
      
      setMessage('')
      onClose()
    } catch (error) {
      console.error('Errore invio feedback:', error)
      // Mostra un messaggio di errore all'utente
      alert('Errore durante l\'invio del feedback. Riprova più tardi.')
    } finally {
      setLoading(false)
    }
  }, [message, type, onSubmit, onClose, user])

  const handleClose = useCallback(() => {
    if (!loading) {
      setMessage('')
      onClose()
    }
  }, [loading, onClose])

  if (!isOpen) return null

  const isBug = type === 'bug'
  const title = isBug ? 'Segnala un Bug' : 'Suggerisci Nuova Funzione'
  const placeholder = isBug 
    ? 'Descrivi il problema che hai riscontrato...'
    : 'Descrivi la tua idea per una nuova funzione...'
  const buttonText = isBug ? 'Invia Segnalazione' : 'Invia Suggerimento'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface-primary rounded-2xl p-6 w-full max-w-md border border-gold-600/20 shadow-2xl relative">
        {/* Header con X */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-text-tertiary hover:text-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Chiudi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {isBug ? 'Descrizione del problema' : 'Descrizione della funzione'}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="w-full p-3 bg-surface-secondary border border-surface-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-gold-600/50 focus:border-gold-600/50 resize-none"
              rows={4}
              required
              disabled={loading}
            />
          </div>

          {/* Bottone Invio */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !message.trim()}
              className={`w-full ${
                isBug 
                  ? 'bg-orange-400 hover:bg-orange-300 text-gray-600 border-orange-400' 
                  : 'bg-green-600 hover:bg-green-500 text-white border-green-600'
              }`}
            >
              {loading ? 'Invio...' : buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
FeedbackDialog.displayName = 'FeedbackDialog'

export default FeedbackDialog
