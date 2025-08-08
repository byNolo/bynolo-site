/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Gradient utilities
    'bg-gradient-to-r',
    // Standard gradient colors used in Hub.jsx
    'from-blue-500',
    'to-blue-600',
    'from-purple-500', 
    'to-purple-600',
    'from-green-500',
    'to-green-600',
    'from-yellow-500',
    'to-yellow-600',
    'from-green-400',
    // Custom hex colors used in Hub.jsx
    'from-[#1DB954]',
    'to-[#1ED760]',
    // Additional gradient utilities used
    'bg-clip-text',
    'text-transparent'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
