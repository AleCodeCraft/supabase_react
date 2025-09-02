import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { memo, useCallback } from 'react'

// ✅ CORRETTO - Componente NotFound memoizzato per evitare re-render
const NotFound = memo(() => {
  const navigate = useNavigate()

  // ✅ CORRETTO - Callback memoizzati per evitare re-render
  const handleGoHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="min-h-screen bg-dark-950 text-text-primary flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-8xl md:text-9xl font-bold text-gold-400 mb-6">
          404
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
          Pagina Non Trovata! 😵
        </h1>
        
        <p className="text-xl text-text-primary/80 mb-8">
          Ops! La pagina che stai cercando non esiste o è stata spostata.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={handleGoHome}
          >
            🏠 Torna alla Home
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleGoBack}
          >
            Torna Indietro
          </Button>
        </div>
      </div>
    </div>
  )
})

// ✅ CORRETTO - Nome per debugging
NotFound.displayName = 'NotFound'

export default NotFound
