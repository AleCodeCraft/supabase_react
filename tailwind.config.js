/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paletta nero/gold come specificato nelle regole
        'dark': {
          950: '#0a0a0a', // nero profondo
          900: '#1a1a1a', // nero
        },
        'gold': {
          400: '#fbbf24', // gold primario
          300: '#fcd34d', // gold hover
        },
        'surface': {
          'secondary': '#2a2a2a', // superfici
        },
        'text': {
          'primary': '#ffffff', // testo bianco
        }
      },
    },
  },
  plugins: [],
}
