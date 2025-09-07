import React, { memo } from 'react'

// ✅ CORRETTO - Componente PublicLayout memoizzato per pagine pubbliche
const PublicLayout = memo(({ children }) => {
  return (
    <div className="min-h-screen bg-dark-950 text-text-primary">
      {children}
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
PublicLayout.displayName = 'PublicLayout'

export default PublicLayout
