/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primaryRegular: 'Regular',
        primaryBold: 'Bold'
      }
    }
  },
  plugins: []
}