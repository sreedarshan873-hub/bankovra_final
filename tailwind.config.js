/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // BANKOVRA blue theme
        ink: '#1E293B',
        navy: {
          DEFAULT: '#0D1B2E',
          700: '#0D1B2E',
          900: '#0D1B2E',
        },
        primary: '#1656C0',
        sky: '#42A5F5',
        lightblue: '#E3F2FD',
        paper: '#F8FAFC',
        line: '#E3F2FD',
        gold: {
          DEFAULT: '#1656C0',
          light: '#E3F2FD',
          dark: '#1656C0',
        },
        teal: {
          DEFAULT: '#1656C0',
          light: '#E3F2FD',
        },
        brick: {
          DEFAULT: '#1656C0',
          light: '#E3F2FD',
        },
        success: {
          DEFAULT: '#1656C0',
          light: '#E3F2FD',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      backgroundImage: {
        ledger: 'none', // Remove vintage ledger styling
      },
      boxShadow: {
        card: '0 4px 16px rgba(13, 27, 46, 0.08)',
        header: '0 1px 10px rgba(13, 27, 46, 0.07)',
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
}
