/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
  ],// or 'class', depending on your setup
  plugins: [
    require('tailwind-scrollbar'),
  ],

  darkMode: 'class',
  theme: {
    extend: {}
  },

}
