import React, { useState, useCallback, memo, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import FeedbackDialog from '../components/FeedbackDialog'
import { supabase } from './auth/supabaseClient'

const Profile = memo(() => {
  const { user, userEmail, userRole, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)
  
  // Stati per il dialog di feedback
  const [feedbackDialog, setFeedbackDialog] = useState({ isOpen: false, type: null })
  
  // Dati utente - presi direttamente da user_metadata di Supabase Auth
  const userData = {
    profileImage: user?.user_metadata?.avatar_url || user?.user_metadata?.picture,
    displayName: user?.user_metadata?.display_name || '',
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    level: user?.user_metadata?.level || 1
  }
  
  // Dati per la modifica
  const [formData, setFormData] = useState(userData)

  // Aggiorna formData quando user cambia
  React.useEffect(() => {
    setFormData(userData)
  }, [user])

  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }, [])

  const handleSave = useCallback(async () => {
    setLoading(true)
    setMessage('')
    
    try {
      // Aggiorna i dati utente in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: formData.displayName,
          full_name: formData.fullName,
          phone: formData.phone
        }
      })

      if (error) throw error
      
      setMessage('Profilo aggiornato con successo!')
      setIsEditing(false)
      
      // I dati verranno aggiornati automaticamente tramite onAuthStateChange
    } catch (error) {
      // Traduci errori comuni in italiano
      let errorMessage = error.message
      if (error.message.includes('network')) {
        errorMessage = 'Errore di connessione. Riprova più tardi.'
      } else if (error.message.includes('permission')) {
        errorMessage = 'Permessi insufficienti per salvare i dati.'
      } else if (error.message.includes('validation')) {
        errorMessage = 'Dati non validi. Controlla i campi inseriti.'
      }
      
      setMessage(`Errore: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }, [formData])

  const handleCancel = useCallback(() => {
    setFormData(userData)
    setIsEditing(false)
    setMessage('')
  }, [user])

  const handleLogout = useCallback(async () => {
    const result = await logout()
    if (!result.success) {
      // Traduci errori di logout in italiano
      let errorMessage = result.error
      if (result.error.includes('network')) {
        errorMessage = 'Errore di connessione durante il logout.'
      } else if (result.error.includes('permission')) {
        errorMessage = 'Errore di permessi durante il logout.'
      } else if (result.error.includes('session')) {
        errorMessage = 'Sessione scaduta. Ricarica la pagina.'
      }
      
      setMessage(`Errore logout: ${errorMessage}`)
    }
  }, [logout])

  // Gestisce il click sull'immagine per aprire il file picker
  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  // Gestisce la selezione del file
  const handleFileChange = useCallback(async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validazione del file
    if (!file.type.startsWith('image/')) {
      setMessage('Seleziona un file immagine valido')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setMessage('L\'immagine deve essere inferiore a 5MB')
      return
    }

    // Crea preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target.result)
    }
    reader.readAsDataURL(file)

    // Upload del file
    setUploading(true)
    setMessage('')

    try {
      // Genera nome file unico
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Ottieni URL pubblico
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Aggiorna il profilo utente
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      })

      if (updateError) throw updateError

      setMessage('Immagine profilo aggiornata con successo!')
      setPreviewImage(null)
      
      // I dati verranno aggiornati automaticamente tramite onAuthStateChange

    } catch (error) {
      console.error('Errore upload:', error)
      
      // Traduci errori comuni in italiano
      let errorMessage = error.message
      if (error.message.includes('not found')) {
        errorMessage = 'Bucket non trovato. Contatta l\'amministratore.'
      } else if (error.message.includes('file too large')) {
        errorMessage = 'File troppo grande. Dimensione massima: 5MB'
      } else if (error.message.includes('invalid file type')) {
        errorMessage = 'Tipo di file non valido. Usa solo immagini.'
      } else if (error.message.includes('network')) {
        errorMessage = 'Errore di connessione. Riprova più tardi.'
      } else if (error.message.includes('permission')) {
        errorMessage = 'Permessi insufficienti. Contatta l\'amministratore.'
      }
      
      setMessage(`Errore: ${errorMessage}`)
      setPreviewImage(null)
    } finally {
      setUploading(false)
    }
  }, [user?.id])

  // Immagine da mostrare (preview o database)
  const displayImage = previewImage || userData.profileImage

  // Gestori per il dialog di feedback
  const handleOpenFeedback = useCallback((type) => {
    setFeedbackDialog({ isOpen: true, type })
  }, [])

  const handleCloseFeedback = useCallback(() => {
    setFeedbackDialog({ isOpen: false, type: null })
  }, [])

  const handleSubmitFeedback = useCallback(async (feedbackMessage, feedbackData) => {
    // Il feedback è già stato salvato nel database dal componente FeedbackDialog
    // Qui possiamo aggiungere logica aggiuntiva se necessario
    
    const feedbackType = feedbackDialog.type === 'bug' ? 'segnalazione bug' : 'suggerimento'
    setMessage(`${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)} inviato con successo! Grazie per il tuo contributo.`)
    
    // Reset del messaggio dopo 5 secondi
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }, [feedbackDialog.type])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-surface-primary rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          
          {/* Header Profilo - ottimizzato per mobile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative group">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gold-600 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gold-500 transition-colors relative"
                onClick={handleImageClick}
                title="Clicca per cambiare immagine profilo"
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Avatar utente"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Se l'immagine non si carica, mostra l'iniziale
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <span 
                  className={`text-2xl font-bold text-dark-950 ${displayImage ? 'hidden' : 'flex'}`}
                  style={{ display: displayImage ? 'none' : 'flex' }}
                >
                  {userEmail?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                
                {/* Overlay per hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Input file nascosto */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Indicatore di caricamento */}
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">
                {userData.fullName || userData.displayName || userEmail || 'Profilo Utente'}
              </h1>
              <p className="text-sm sm:text-base text-text-secondary">Informazioni personali</p>
            </div>
          </div>

          {/* Messaggi */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successo') 
                ? 'bg-green-900/20 text-green-400 border border-green-600/30' 
                : 'bg-red-900/20 text-red-400 border border-red-600/30'
            }`}>
              {message}
            </div>
          )}

          {/* Informazioni Utente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Informazioni Personali */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Informazioni Personali</h2>
                {!isEditing && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Modifica
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Nome e Cognome"
                    value={formData.fullName}
                    onChange={handleInputChange('fullName')}
                    placeholder="Inserisci il tuo nome e cognome"
                  />
                  
                  <Input
                    label="Username"
                    value={formData.displayName}
                    onChange={handleInputChange('displayName')}
                    placeholder="Scegli il tuo username"
                  />
                  
                  <Input
                    label="Telefono"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    placeholder="Numero di telefono"
                    type="tel"
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? 'Salvataggio...' : 'Salva'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      Annulla
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Nome e Cognome
                    </label>
                    <div className="p-3 bg-surface-secondary rounded-lg text-text-primary">
                      {formData.fullName || 'Non specificato'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Username
                    </label>
                    <div className="p-3 bg-surface-secondary rounded-lg text-text-primary">
                      {formData.displayName || 'Non specificato'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Telefono
                    </label>
                    <div className="p-3 bg-surface-secondary rounded-lg text-text-primary">
                      {formData.phone || 'Non specificato'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dettagli Account */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Dettagli Account</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <div className="p-3 bg-surface-secondary rounded-lg text-text-primary">
                    {userEmail}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    Ruolo
                  </label>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gold-600/30 text-gold-300 border border-gold-600/50">
                    {userRole}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    Livello Utente
                  </label>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-600/30 text-blue-300 border border-blue-600/50">
                    Livello {userData.level}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Azioni Account */}
          <div className="mt-12 pt-8 border-t border-gold-600/20">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Azioni Account</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                onClick={() => handleOpenFeedback('suggestion')}
                className="bg-green-600 hover:bg-green-500 text-white border-green-600"
              >
                Suggerisci Nuova Funzione
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => handleOpenFeedback('bug')}
                className="bg-orange-400 hover:bg-orange-300 text-white border-orange-400"
              >
                Segnala un Bug
              </Button>
            </div>
          </div>

          {/* Sezione Logout */}
          <div className="mt-8 pt-8 border-t border-gold-600/20">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Account</h2>
            
            <div className="bg-surface-secondary rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-text-primary mb-2">Esci dall'account</h3>
                  <p className="text-sm text-text-secondary">
                    Chiudi la sessione corrente e torna alla schermata di login.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="bg-gray-600 hover:bg-gray-500 text-white border-gray-600 ml-4"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Esci
                </Button>
              </div>
            </div>
          </div>

          {/* Informazioni Aggiuntive */}
          <div className="mt-8 p-4 bg-surface-secondary rounded-lg">
            <h3 className="text-sm font-medium text-text-primary mb-4">Informazioni Tecniche</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex justify-between items-center py-2 border-b border-gold-600/10">
                <span className="text-text-secondary text-xs">Account creato:</span>
                <span className="text-text-primary text-xs font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('it-IT') : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gold-600/10">
                <span className="text-text-secondary text-xs">Stato Account:</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  user?.email_confirmed_at 
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
                    : 'bg-orange-600/20 text-orange-400 border border-orange-600/30'
                }`}>
                  {user?.email_confirmed_at ? 'Verificato' : 'Non verificato'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gold-600/10">
                <span className="text-text-secondary text-xs">Provider di Login:</span>
                <span className="text-text-primary text-xs font-medium">
                  {user?.app_metadata?.provider || 'Email'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gold-600/10">
                <span className="text-text-secondary text-xs">Versione App:</span>
                <span className="text-text-primary text-xs font-medium">1.0.0</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gold-600/10 sm:col-span-2">
                <span className="text-text-secondary text-xs">Lingua Preferita:</span>
                <span className="text-text-primary text-xs font-medium">
                  {navigator.language || 'it-IT'}
                </span>
              </div>
            </div>
          </div>

          {/* Sezioni Footer integrate */}
          <div className="mt-8 pt-6 border-t border-gold-600/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              
              {/* Copyright - sempre visibile */}
              <div className="text-center sm:text-left order-2 sm:order-1">
                <p className="text-text-secondary text-xs sm:text-sm">
                  © 2025 Arena StileNuovo Tutti i diritti riservati
                </p>
              </div>

              {/* Link e contatti - sempre visibili */}
              <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
                {/* Privacy Policy */}
                <a 
                  href="/privacy-policy" 
                  className="text-text-secondary hover:text-gold-600 text-xs sm:text-sm transition-colors px-3 py-1 rounded-md hover:bg-gold-600/10"
                >
                  Privacy Policy
                </a>

                {/* Contatti - sempre visibile */}
                <a 
                  href="mailto:alex.studiolab@gmail.com" 
                  className="flex items-center gap-2 text-text-secondary hover:text-gold-600 text-xs sm:text-sm transition-colors px-3 py-1 rounded-md hover:bg-gold-600/10"
                >
                  alex.studiolab@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog di Feedback */}
      <FeedbackDialog
        isOpen={feedbackDialog.isOpen}
        onClose={handleCloseFeedback}
        type={feedbackDialog.type}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  )
})

Profile.displayName = 'Profile'

export default Profile
