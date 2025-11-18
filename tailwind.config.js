/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // These paths tell Tailwind to scan your HTML and all files inside src/
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}