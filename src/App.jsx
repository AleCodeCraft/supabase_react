
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
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Pagine del menu hamburger
const SfideCorrenti = lazy(() => import('./pages/SfideCorrenti'))
const ClassificaGenerale = lazy(() => import('./pages/ClassificaGenerale'))
const SfideApprovazione = lazy(() => import('./pages/SfideApprovazione'))
const Gamification = lazy(() => import('./pages/Gamification'))
const StatoApplicazione = lazy(() => import('./pages/StatoApplicazione'))

// Pagine pubbliche per footer
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))

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
            
            {/* Pagine pubbliche per footer */}
            <Route 
              path="/privacy-policy" 
              element={<PublicLayout><PrivacyPolicy /></PublicLayout>} 
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
            
            {/* Route profilo utente */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Profile />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Route menu hamburger */}
            <Route 
              path="/sfide-correnti" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <SfideCorrenti />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/classifica" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <ClassificaGenerale />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sfide-approvazione" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <SfideApprovazione />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/gamification" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Gamification />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stato-app" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <StatoApplicazione />
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