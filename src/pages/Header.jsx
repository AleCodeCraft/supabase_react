import React, { memo } from 'react'
import { Button } from '../components/Button'

// ✅ CORRETTO - Componente Header memoizzato per evitare re-render
const Header = memo(({ onLogout }) => {
  return (
    <header className="bg-surface-secondary border-b border-gold-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gold-400">
            Arena StileNuovo
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
})

// ✅ CORRETTO - Nome per debugging
Header.displayName = 'Header'

export default Header
