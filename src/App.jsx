
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useAuth } from './shared/hooks/useAuth'
import ProtectedRoute from './shared/components/ProtectedRoute'
import ErrorBoundary from './utils/ErrorBoundary'
//import HealthMonitor from './shared/components/HealthMonitor'

// Lazy loading per componenti pesanti
const Login = lazy(() => import('./features/auth/Login'))
const SignUp = lazy(() => import('./features/auth/SignUp'))
const ForgotPassword = lazy(() => import('./features/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./features/auth/ResetPassword'))
const Home = lazy(() => import('./features/dashboard/Home'))
const NotFound = lazy(() => import('./features/dashboard/NotFound'))

// Loading component con spaziature perfette
const LoadingSpinner = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 md:p-6 lg:p-8">
    <div className="text-center space-y-4 md:space-y-6">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-400 mx-auto"></div>
      <p className="text-gold-400 text-lg">Caricamento...</p>
    </div>
  </div>
)

function App() {
  const { session, loading } = useAuth()

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
              element={session ? <Navigate to="/" replace /> : <Login />} 
            />
            <Route 
              path="/signup" 
              element={session ? <Navigate to="/" replace /> : <SignUp />} 
            />
            <Route 
              path="/forgot-password" 
              element={session ? <Navigate to="/" replace /> : <ForgotPassword />} 
            />
            <Route 
              path="/reset-password" 
              element={<ResetPassword />} 
            />
            
            {/* Route protette */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        {/* <HealthMonitor /> */}
        
      </Router>
    </ErrorBoundary>
  )
}

export default App