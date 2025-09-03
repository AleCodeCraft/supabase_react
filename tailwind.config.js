/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paletta Supabase - tema scuro con verde
        'dark': {
          950: '#0a0a0a', // nero profondo
          900: '#1a1a1a', // nero
          800: '#2a2a2a', // grigio scuro
        },
        'green': {
          600: '#16a34a', // verde scuro primario
          500: '#22c55e', // verde scuro più chiaro
          400: '#4ade80', // verde hover
          300: '#6ee7b7', // verde light
        },
        'surface': {
          'primary': '#1a1a1a',   // superficie principale
          'secondary': '#2a2a2a', // superficie secondaria
          'tertiary': '#3a3a3a',  // superficie terziaria
        },
        'text': {
          'primary': '#ffffff',   // testo bianco
          'secondary': '#e5e5e5', // testo grigio chiaro
          'muted': '#a3a3a3',     // testo grigio
        },
        'accent': {
          'primary': '#16a34a',   // verde scuro primario
          'secondary': '#22c55e', // verde scuro secondario
        }
      },
    },
  },
  plugins: [],
}
