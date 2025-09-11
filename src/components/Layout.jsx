import React, { memo } from 'react'
import Header from '../pages/Header'

// ✅ CORRETTO - Componente Layout memoizzato per evitare re-render
const Layout = memo(({ children }) => {
  return (
    <div className="min-h-screen text-text-primary flex flex-col relative overflow-hidden">
      {/* Background nero di base */}
      <div className="absolute inset-0 bg-dark-950"></div>
      
      {/* Pattern di sfondo con esagoni grigi leggeri - sopra il nero ma sotto tutto il resto */}
      <div className="absolute inset-0 opacity-15 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a1a1aa' fill-opacity='0.3'%3E%3Cpath d='M10 0l10 5.77v11.54L10 23.08 0 17.31V5.77z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 17px',
          backgroundPosition: '0 0',
          animation: 'float 120s ease-in-out infinite'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a1a1aa' fill-opacity='0.25'%3E%3Cpath d='M10 0l10 5.77v11.54L10 23.08 0 17.31V5.77z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 17px',
          backgroundPosition: '15px 3px',
          animation: 'float 140s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a1a1aa' fill-opacity='0.28'%3E%3Cpath d='M10 0l10 5.77v11.54L10 23.08 0 17.31V5.77z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 17px',
          backgroundPosition: '7px 11px',
          animation: 'float 160s ease-in-out infinite'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a1a1aa' fill-opacity='0.22'%3E%3Cpath d='M10 0l10 5.77v11.54L10 23.08 0 17.31V5.77z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 17px',
          backgroundPosition: '22px 6px',
          animation: 'float 180s ease-in-out infinite reverse'
        }}></div>
      </div>
      {/* Header */}
      <div className="relative z-1">
        <Header />
      </div>
      
      {/* Main Content - ottimizzato per mobile */}
      <main className="flex-1 pb-4 sm:pb-0 relative z-1">
        <div className="min-h-full relative z-1">
          {children}
        </div>
      </main>
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
Layout.displayName = 'Layout'

export default Layout
