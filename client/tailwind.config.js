/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christ: {
          navy: '#0F2540',
          blue: '#1E3A5F',
          gold: '#D4AF37',
        }
      }
    },
  },
  plugins: [],
}
