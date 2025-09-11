/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paletta tema scuro e celeste
        'dark': {
          950: '#0a0a0a', // nero profondo
          900: '#1a1a1a', // nero
          800: '#2a2a2a', // grigio scuro
          700: '#3a3a3a', // grigio medio
        },
        'sky': {
          500: '#0ea5e9', // celeste scuro principale
          400: '#38bdf8', // celeste chiaro
          300: '#7dd3fc', // celeste brillante
          200: '#bae6fd', // celeste tenue
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
          'primary': '#0ea5e9',   // celeste scuro primario
          'secondary': '#38bdf8', // celeste chiaro secondario
          'hover': '#7dd3fc',     // celeste brillante hover
          'bg': '#bae6fd',        // celeste tenue background
        }
      },
    },
  },
  plugins: [],
}
