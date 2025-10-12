/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // add this if using `/app` directory in Next.js
  ],
  plugins: [
    require('tailwind-scrollbar'),
  ],
  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        // Custom max-width breakpoints for desktop-first development
        'max-2xl': { max: '1535px' },
        'max-xl': { max: '1279px' },
        'max-lg': { max: '1023px' },
        'max-md': { max: '767px' },
        'max-sm': { max: '639px' },
      },
    },
  },
}
