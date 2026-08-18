/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // SBI ePay Official Color Theme
        ink: '#333333',      // Dark gray text
        navy: {
          DEFAULT: '#061B6B', // SBI Deep Navy (Official)
          700: '#040F48',     // Darker shade
          900: '#020728',     // Darkest shade
        },
        paper: '#FFFFFF',    // Pure white background
        line: '#F0F0F0',      // Light gray lines
        gold: {
          DEFAULT: '#0FB3F5', // SBI Bright Cyan accent
          light: '#6594FF',   // Light blue
          dark: '#0A7BA8',    // Dark cyan
        },
        teal: {
          DEFAULT: '#0FB3F5', // Cyan highlight
          light: '#E0F7FF',   // Very light cyan background
        },
        brick: {
          DEFAULT: '#D84315', // Alert red
          light: '#FFEBEE',   // Light red background
        },
        success: {
          DEFAULT: '#2E7D32', // Success green
          light: '#E8F5E9',   // Light green background
        },
      },
      fontFamily: {
        display: ['"Segoe UI"', '"Trebuchet MS"', 'sans-serif'],
        sans: ['"Segoe UI"', '"Roboto"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      backgroundImage: {
        ledger: 'none', // Remove vintage ledger styling
      },
      boxShadow: {
        card: '0 2px 8px rgba(26,58,90,0.08), 0 4px 16px rgba(26,58,90,0.12)',
        header: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      },
      borderRadius: {
        card: '4px',
      },
    },
  },
  plugins: [],
}
