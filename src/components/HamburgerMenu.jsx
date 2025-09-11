import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    {
      id: 'progressi-personali',
      title: 'Progressi Personali',
      icon: '📈',
      path: '/',
      description: 'Dashboard e progressi personali'
    },
    {
      id: 'sfide-correnti',
      title: 'Sfide Correnti',
      icon: '🏆',
      path: '/sfide-correnti',
      description: 'Le tue sfide attive'
    },
    {
      id: 'classifica',
      title: 'Classifica Generale',
      icon: '📊',
      path: '/classifica',
      description: 'Classifica degli utenti'
    },
    {
      id: 'sfide-approvazione',
      title: 'Sfide in Approvazione',
      icon: '⏳',
      path: '/sfide-approvazione',
      description: 'Crea e gestisci sfide'
    },
    {
      id: 'gamification',
      title: 'Gamification',
      icon: '🎮',
      path: '/gamification',
      description: 'Sistema di premi e achievement'
    },
    {
      id: 'stato-app',
      title: 'Stato Applicazione',
      icon: '📡',
      path: '/stato-app',
      description: 'Monitoraggio realtime'
    }
  ]

  const handleItemClick = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Pulsante Hamburger - Solo quando il menu è chiuso */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="w-10 h-10 flex items-center justify-center text-white hover:text-gold-400 hover:scale-110 active:scale-95 transition-all duration-300 ease-out rounded-lg hover:bg-dark-800/50"
          title="Menu"
        >
          <svg 
            className="w-6 h-6 transition-transform duration-300 ease-out" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          style={{ zIndex: 99998 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Laterale */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-dark-900 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 99999 }}
      >
        <div className="p-6">
          {/* Header del menu */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-gold-400 hover:scale-110 active:scale-95 transition-all duration-300 ease-out rounded-lg hover:bg-dark-700/50"
            >
              <svg className="w-6 h-6 transition-transform duration-300 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lista menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className="w-full flex items-center p-4 rounded-lg hover:bg-dark-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out text-left group hover:shadow-lg hover:shadow-gold-400/10"
              >
                <span className="text-2xl mr-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium group-hover:text-gold-400 transition-colors duration-300 ease-out">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 ease-out">
                    {item.description}
                  </div>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default HamburgerMenu
