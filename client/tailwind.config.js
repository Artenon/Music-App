/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Ubuntu', 'sans']
    },
    extend: {
      boxShadow: {
        'inner': 'inset 0 0 60px rgb(0 0 0 / 1)',
        'player': '0 0 20px rgb(0 0 0 / .4)'
      },
      animation: {
        spinner: 'animateSpinner 0.2s linear'
      },
      keyframes: {
        animateSpinner: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
