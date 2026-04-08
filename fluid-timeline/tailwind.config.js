/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f19',
        surface: '#111827',
        accent: '#6366f1',
        text: '#e2e8f0',
        muted: '#94a3b8'
      }
    }
  },
  plugins: []
}

