import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Validazione delle variabili d'ambiente
if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL non è definita. Controlla le variabili d\'ambiente.')
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY non è definita. Controlla le variabili d\'ambiente.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)