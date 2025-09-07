import React, { memo } from 'react'

// ✅ CORRETTO - Componente Footer memoizzato per evitare re-render
const Footer = memo(() => {
  return (
    <footer className="bg-surface-secondary border-t border-gold-600/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img 
              src="/logo.svg" 
              alt="Arena StileNuovo" 
              className="w-8 h-8"
            />
            <span className="text-text-secondary text-sm">
              © 2024 Arena StileNuovo. Tutti i diritti riservati.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-gold-600 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-secondary hover:text-gold-600 text-sm transition-colors">
              Termini di Servizio
            </a>
            <a href="#" className="text-text-secondary hover:text-gold-600 text-sm transition-colors">
              Supporto
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})

// ✅ CORRETTO - Nome per debugging
Footer.displayName = 'Footer'

export default Footer
