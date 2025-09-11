import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { memo, useCallback } from 'react'

// ✅ CORRETTO - Componente FeatureCard memoizzato per evitare re-render
const FeatureCard = memo(({ title, description, icon }) => (
  <div className="bg-surface-secondary rounded-2xl p-4 sm:p-6 lg:p-8 border border-gold-600/30 hover:border-gold-600/60 hover:bg-surface-tertiary transition-all duration-300 group">
    <div className="flex items-start gap-3 sm:gap-4">
      {icon && (
        <div className="text-2xl sm:text-3xl flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gold-600 mb-2 sm:mb-3 group-hover:text-gold-600 transition-colors">{title}</h3>
        <p className="text-sm sm:text-base text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
))

// ✅ CORRETTO - Nome per debugging
FeatureCard.displayName = 'FeatureCard'

// ✅ CORRETTO - Componente Home memoizzato
const Home = memo(() => {
  const navigate = useNavigate()

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          {/* Header mobile-first */}
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gold-400 mb-4 sm:mb-6">
            Benvenuto nella tua App!
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Template base con autenticazione Supabase, React 19, Vite e Tailwind CSS. Pronto per essere personalizzato.
          </p>
          
          {/* Feature Cards - Ottimizzate per mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16">
            {featureCards.map((feature, index) => (
              <FeatureCard
                key={`feature-${index}`}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>

          {/* Call to Action - rimosso logout (ora nel profilo) */}
          <div className="mt-8 sm:mt-16">
            <div className="bg-surface-secondary rounded-2xl p-6 sm:p-8 border border-gold-600/20">
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">
                🎯 Pronto per iniziare?
              </h3>
              <p className="text-sm sm:text-base text-text-secondary mb-4">
                Esplora le funzionalità dell'app e personalizza la tua esperienza.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/profile')}
                className="shadow-2xl w-full sm:w-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Vai al Profilo
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
Home.displayName = 'Home'

export default Home
