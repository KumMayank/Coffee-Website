/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#0B0705',
          900: '#120C09', // espresso black
          800: '#1A110D',
          700: '#231712',
        },
        mocha: {
          900: '#1E1511', // dark mocha
          800: '#261B16',
          700: '#32231D',
          600: '#3F2C24',
        },
        cardbrown: {
          DEFAULT: '#2A1D17', // card brown
          light: '#35251E',
          lighter: '#433026',
        },
        caramel: {
          DEFAULT: '#C08A55', // gold/caramel
          light: '#D4A373',
          dark: '#A6703D',
          glow: '#E9C46A',
        },
        cream: {
          DEFAULT: '#F3E7D8', // cream
          soft: '#FBF7F2',
          muted: '#D8C6B2',
          dim: '#9E8B79',
        },
        gold: {
          300: '#FDE68A',
          400: '#FACC15',
          500: '#C08A55',
          600: '#A6703D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'luxury': '0 20px 50px rgba(18, 12, 9, 0.6), 0 0 20px rgba(192, 138, 85, 0.15)',
        'gold-glow': '0 0 25px rgba(192, 138, 85, 0.45)',
        'card-glow': 'inset 0 1px 1px 0 rgba(243, 231, 216, 0.1), 0 10px 30px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
