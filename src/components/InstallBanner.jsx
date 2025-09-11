import React, { memo, useCallback } from 'react'
import { Button } from './Button'

const InstallBanner = memo(({ onInstall, onDismiss }) => {
  const handleInstall = useCallback(() => {
    onInstall()
  }, [onInstall])

  const handleDismiss = useCallback(() => {
    onDismiss()
  }, [onDismiss])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-primary border-t border-gold-600/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4">
        {/* Mobile Layout - Stack verticale */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Logo e Nome - Centrato */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="Arena StileNuovo" 
                className="w-10 h-10"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-base font-semibold text-text-primary leading-tight">
                Arena StileNuovo
              </h3>
              <p className="text-xs text-text-secondary leading-tight">
                Installa l'app
              </p>
            </div>
          </div>

          {/* Pulsanti - Centrati e full width */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleInstall}
              className="flex-1 bg-gold-600 hover:bg-gold-500 text-dark-950 font-semibold py-3 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
              <span>Installa</span>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDismiss}
              className="px-4 py-3 text-white hover:text-gold-400 hover:bg-surface-secondary flex items-center justify-center border border-surface-tertiary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Desktop Layout - Orizzontale */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Logo e Nome - Allineamento sinistra */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="Arena StileNuovo" 
                className="w-12 h-12"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-text-primary leading-tight">
                Arena StileNuovo
              </h3>
              <p className="text-sm text-text-secondary leading-tight">
                Installa l'app per un accesso più rapido
              </p>
            </div>
          </div>

          {/* Pulsanti - Allineamento destra */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={handleInstall}
              className="bg-gold-600 hover:bg-gold-500 text-dark-950 font-semibold px-4 py-2 h-8 flex items-center gap-2"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
              <span>Installa</span>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDismiss}
              className="px-3 py-2 h-8 text-white hover:text-gold-400 hover:bg-surface-secondary flex items-center gap-1 border border-surface-tertiary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm">Chiudi</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

InstallBanner.displayName = 'InstallBanner'

export { InstallBanner }
