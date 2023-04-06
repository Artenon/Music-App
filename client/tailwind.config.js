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
      dropShadow: {
        'heart': '0 0 7px #be185d'
      },
      animation: {
        spinner: 'animateSpinner 0.2s linear',
        heartIn: 'animateHeartIn 0.2s ease-out',
        heartOut: 'animateHeartOut 0.2s ease-in-out'
      },
      keyframes: {
        animateSpinner: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' }
        },
        animateHeartIn: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform:  'scale(1.2)' },
          '100%': { transform:  'scale(1)' }
        },
        animateHeartOut: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10%)' },
          '75%': { transform:  'translateX(10%)' },
          '100%': { transform:  'translateX(0))' }
        }
      }
    },
  },
  plugins: [],
}
