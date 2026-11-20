/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030305',
          DEFAULT: '#050507',
          900: '#090A0D',
          800: '#111216',
          700: '#1A1C23',
        },
        porcelain: {
          DEFAULT: '#F5F5F7',
          muted: '#A1A1A6',
          dark: '#6E6E73'
        },
        crimson: {
          dark: '#1A0205',
          deep: '#8B0015',
          DEFAULT: '#DC2626',
          vivid: '#FF1E38',
          glow: '#FFA0B8'
        },
        rhodium: {
          light: '#F4F4F6',
          DEFAULT: '#D4D4D8',
          dark: '#71717A'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif']
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        widest: '0.25em',
        ultra: '0.35em'
      }
    },
  },
  plugins: [],
}
