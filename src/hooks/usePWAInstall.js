import { useState, useEffect, useCallback } from 'react'

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [canInstall, setCanInstall] = useState(false)

  // Controlla se l'app è già installata
  useEffect(() => {
    // Controlla se è in modalità standalone (installata)
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInApp = window.navigator.standalone === true // iOS Safari
      
      setIsInstalled(isStandalone || isInApp)
    }

    checkIfInstalled()

    // Ascolta cambiamenti display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addEventListener('change', checkIfInstalled)

    return () => {
      mediaQuery.removeEventListener('change', checkIfInstalled)
    }
  }, [])

  // Gestisce l'evento beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previene la visualizzazione automatica del prompt
      e.preventDefault()
      // Salva l'evento per mostrarlo più tardi
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    // Gestisce l'evento appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // Funzione per installare l'app
  const installApp = useCallback(async () => {
    if (!deferredPrompt) return false

    try {
      // Mostra il prompt di installazione
      deferredPrompt.prompt()
      
      // Aspetta la risposta dell'utente
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('✅ Utente ha accettato l\'installazione')
        setIsInstalled(true)
        setDeferredPrompt(null)
        setCanInstall(false)
        return true
      } else {
        console.log('❌ Utente ha rifiutato l\'installazione')
        return false
      }
    } catch (error) {
      console.error('Errore durante l\'installazione:', error)
      return false
    }
  }, [deferredPrompt])

  // Funzione per nascondere il banner
  const dismissBanner = useCallback(() => {
    // Salva la preferenza dell'utente nel localStorage
    localStorage.setItem('pwa-install-dismissed', 'true')
    setCanInstall(false)
  }, [])

  // Controlla se l'utente ha già rifiutato l'installazione
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed === 'true') {
      setCanInstall(false)
    }
  }, [])

  return {
    canInstall: canInstall && !isInstalled,
    isInstalled,
    installApp,
    dismissBanner
  }
}
