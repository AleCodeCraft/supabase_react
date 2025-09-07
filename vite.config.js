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
    },
    cssCodeSplit: false,
    sourcemap: false,
    assetsDir: 'assets'
  },
  server: {
    hmr: { overlay: false }
  },
  define: {
    global: 'globalThis',
  },
  esbuild: {
    jsx: 'automatic'
  },
  css: {
    postcss: './postcss.config.js'
  },
  base: '/'
})