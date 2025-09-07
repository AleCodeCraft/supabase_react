/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paletta tema scuro e oro
        'dark': {
          950: '#0a0a0a', // nero profondo
          900: '#1a1a1a', // nero
          800: '#2a2a2a', // grigio scuro
          700: '#3a3a3a', // grigio medio
        },
        'gold': {
          600: '#8b6914', // oro scuro unico
          500: '#8b6914', // oro scuro unico
          400: '#8b6914', // oro scuro unico
          300: '#8b6914', // oro scuro unico
          200: '#8b6914', // oro scuro unico
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
          'primary': '#8b6914',   // oro scuro unico primario
          'secondary': '#8b6914', // oro scuro unico secondario
        }
      },
    },
  },
  plugins: [],
}
