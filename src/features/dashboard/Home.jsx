import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { Button } from '../../shared/components/Button'
import { memo, useCallback } from 'react'

// ✅ CORRETTO - Componente FeatureCard memoizzato per evitare re-render
const FeatureCard = memo(({ title, description }) => (
  <div className="bg-surface-secondary rounded-2xl p-8 border border-green-600/30 hover:border-green-500/60 hover:bg-surface-tertiary transition-all duration-300 group">
    <h3 className="text-xl font-semibold text-green-400 mb-3 group-hover:text-green-300 transition-colors">{title}</h3>
    <p className="text-text-secondary group-hover:text-text-primary transition-colors">{description}</p>
  </div>
))

// ✅ CORRETTO - Nome per debugging
FeatureCard.displayName = 'FeatureCard'

// ✅ CORRETTO - Componente Home memoizzato
const Home = memo(() => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  // ✅ CORRETTO - Callback memoizzati per evitare re-render
  const handleLogout = useCallback(async () => {
    const result = await logout()
    if (result.success) {
      navigate('/login')
    } else {
      console.error('Errore logout:', result.error)
    }
  }, [logout, navigate])

  // ✅ CORRETTO - Dati delle feature memoizzati
  const featureCards = [
    {
      icon: '🔐',
      title: 'Autenticazione Completa',
      description: 'Sistema di login/registrazione con email, password e Google OAuth integrato.'
    },
    {
      icon: '⚡',
      title: 'Performance Ottimizzate',
      description: 'Lazy loading, memoizzazione e bundle splitting per prestazioni eccellenti.'
    },
    {
      icon: '🎨',
      title: 'Design System',
      description: 'Componenti riutilizzabili con tema dark e palette colori personalizzabile.'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-950 text-text-primary">
      {/* Header */}
      <header className="bg-surface-secondary border-b border-green-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-green-400">
              React App Base
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-green-400 mb-6">
            Benvenuto nella tua App!
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
            Template base con autenticazione Supabase, React 19, Vite e Tailwind CSS. Pronto per essere personalizzato.
          </p>
          
          {/* Feature Cards - Ottimizzate con memo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {featureCards.map((feature, index) => (
              <FeatureCard
                key={`feature-${index}`}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLogout}
              className="shadow-2xl"
            >
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
Home.displayName = 'Home'

export default Home
