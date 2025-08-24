import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import SignUp from './SignUp'
import Account from './Account'

function App() {
  const [session, setSession] = useState(null)
  const [currentPage, setCurrentPage] = useState('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  // Se l'utente è autenticato, mostra il profilo
  if (session) {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Account key={session.user.id} session={session} />
      </div>
    )
  }

  // Se l'utente non è autenticato, mostra login o registrazione
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {currentPage === 'login' ? (
        <Auth onSwitchToSignUp={() => setCurrentPage('signup')} />
      ) : (
        <SignUp onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  )
}

export default App