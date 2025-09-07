import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Layout from './Layout'
import { useCallback } from 'react'

// ✅ CORRETTO - Componente ProtectedLayout memoizzato
const ProtectedLayout = memo(({ children }) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  // ✅ CORRETTO - Callback memoizzato per il logout
  const handleLogout = useCallback(async () => {
    const result = await logout()
    if (result.success) {
      navigate('/login')
    } else {
      console.error('Errore logout:', result.error)
    }
  }, [logout, navigate])

  return (
    <Layout onLogout={handleLogout}>
      {children}
    </Layout>
  )
})

// ✅ CORRETTO - Nome per debugging
ProtectedLayout.displayName = 'ProtectedLayout'

export default ProtectedLayout
