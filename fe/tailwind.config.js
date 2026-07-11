// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdf8f3',
          100: '#faf0e6',
          200: '#f5e1d0',
          300: '#eed2ba',
          400: '#e6c3a4',
          500: '#deb48e',
          600: '#c9a07a',
          700: '#b48c66',
          800: '#9f7852',
          900: '#8a643e',
          950: '#75502a',
        },
        dark: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1d20',
          950: '#0d0f12',
        },
      },
    },
  },
  plugins: [],
}