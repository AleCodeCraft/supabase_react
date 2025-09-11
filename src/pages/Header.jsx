import React, { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import HamburgerMenu from '../components/HamburgerMenu'

// ✅ CORRETTO - Componente Header memoizzato per evitare re-render
const Header = memo(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userEmail, user } = useAuth()

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleBackClick = () => {
    navigate(-1) // Torna alla pagina precedente
  }

  // Determina se mostrare il pulsante back (solo per pagine non del menu)
  const menuPages = ['/sfide-correnti', '/classifica', '/sfide-approvazione', '/gamification', '/stato-app']
  const showBackButton = !menuPages.includes(location.pathname) && location.pathname !== '/'

  // Ottieni l'immagine del profilo dal database
  const profileImage = user?.user_metadata?.avatar_url || user?.user_metadata?.picture

  return (
    <header className="bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-4">
          {/* Icona back o menu hamburger a sinistra */}
          <div className="flex items-center">
            {showBackButton ? (
              <button
                onClick={handleBackClick}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-gold-400 transition-colors"
                title="Torna indietro"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
            ) : (
              <HamburgerMenu />
            )}
          </div>
          
          {/* Titolo centrato con brand */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3">
            <img 
              src="/logo.svg" 
              alt="Arena StileNuovo" 
              className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
            />
            
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Arena
              </h1>
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Stilenuovo
              </h1>
            </div>
          </div>
          
          {/* Icona profilo a destra */}
          <div className="flex items-center">
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 bg-gold-600 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors group overflow-hidden shadow-lg"
              title="Profilo Utente"
            >
              {profileImage ? (
                <img
                  src={profileImage}
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
                className={`text-sm font-bold text-dark-950 ${profileImage ? 'hidden' : 'flex'}`}
                style={{ display: profileImage ? 'none' : 'flex' }}
              >
                {userEmail?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
})

// ✅ CORRETTO - Nome per debugging
Header.displayName = 'Header'

export default Header
