/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'hero-red': '#B91C1C',
        'hero-blue': '#1D4ED8',
      }
    },
  },
  plugins: [],
}