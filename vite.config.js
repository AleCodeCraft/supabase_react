import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Configurazione Vite ottimizzata per React App Base
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    hmr: { overlay: false }
  
  }
})