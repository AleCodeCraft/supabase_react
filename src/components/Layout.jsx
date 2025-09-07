import React, { memo } from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

// ✅ CORRETTO - Componente Layout memoizzato per evitare re-render
const Layout = memo(({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-dark-950 text-text-primary flex flex-col">
      {/* Header */}
      <Header onLogout={onLogout} />
      
      {/* Main Content - flex-1 per occupare lo spazio rimanente */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
Layout.displayName = 'Layout'

export default Layout
