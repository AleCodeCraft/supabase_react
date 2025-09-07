
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { usePWAInstall } from './hooks/usePWAInstall'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLayout from './components/ProtectedLayout'
import PublicLayout from './components/PublicLayout'
import { InstallBanner } from './components/InstallBanner'
import ErrorBoundary from './utils/ErrorBoundary'
//import HealthMonitor from './components/HealthMonitor'

// Lazy loading per componenti pesanti
const Login = lazy(() => import('./pages/auth/Login'))
const SignUp = lazy(() => import('./pages/auth/SignUp'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component con spaziature perfette
const LoadingSpinner = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 md:p-6 lg:p-8">
    <div className="text-center space-y-4 md:space-y-6">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-600 mx-auto"></div>
      <p className="text-gold-600 text-lg">Caricamento...</p>
    </div>
    
  </div>
)

function App() {
  const { session, loading } = useAuth()
  const { canInstall, installApp, dismissBanner } = usePWAInstall()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Route pubbliche */}
            <Route 
              path="/login" 
              element={session ? <Navigate to="/" replace /> : <PublicLayout><Login /></PublicLayout>} 
            />
            <Route 
              path="/signup" 
              element={session ? <Navigate to="/" replace /> : <PublicLayout><SignUp /></PublicLayout>} 
            />
            <Route 
              path="/forgot-password" 
              element={session ? <Navigate to="/" replace /> : <PublicLayout><ForgotPassword /></PublicLayout>} 
            />
            <Route 
              path="/reset-password" 
              element={<PublicLayout><ResetPassword /></PublicLayout>} 
            />
            
            {/* Route protette */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Home />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Route dashboard (alias per home) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Home />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Route 404 */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </Suspense>
        
        {/* <HealthMonitor /> */}
        
      </Router>
      
      {/* PWA Install Banner - Solo se autenticato e non installato */}
      {session && canInstall && (
        <InstallBanner 
          onInstall={installApp}
          onDismiss={dismissBanner}
        />
      )}
    </ErrorBoundary>
  )
}

export default App