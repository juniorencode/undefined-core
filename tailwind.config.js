/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './lib/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e'
        },
        secondary: {
          DEFAULT: '#64748b',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      boxShadow: {
        'box-top': '0 -16px 60px 2px rgba(0, 0, 0, 0.2)',
        left: '-16px 0 60px 2px rgba(0, 0, 0, 0.2)',
        rigth: '16px 0 60px 2px rgba(0, 0, 0, 0.2)',
        'box-bottom': '0 16px 60px 2px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
};
