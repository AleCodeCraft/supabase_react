import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Debug: verifica le variabili d'ambiente
console.log('=== DEBUG SUPABASE CLIENT ===')
console.log('VITE_SUPABASE_URL:', supabaseUrl)
console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', supabaseAnonKey ? 'Definita' : 'Non definita')
console.log('Tutte le variabili env:', import.meta.env)

// Verifica che le variabili siano definite
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERRORE: Le variabili d\'ambiente di Supabase non sono configurate!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl)
  console.error('VITE_SUPABASE_PUBLISHABLE_KEY:', supabaseAnonKey)
  throw new Error('Le variabili d\'ambiente di Supabase non sono configurate correttamente')
}

console.log('✅ Variabili d\'ambiente configurate correttamente')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)