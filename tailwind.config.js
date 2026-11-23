/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        basalt: {
          DEFAULT: '#0D0D0F',
          deep: '#08080A',
        },
        graphite: {
          DEFAULT: '#151518',
          subtle: '#1C1C20',
          border: 'rgba(242, 239, 233, 0.08)',
        },
        alabaster: {
          DEFAULT: '#F2EFE9',
          muted: '#D8D4CC',
        },
        titanium: {
          DEFAULT: '#8E8A82',
          dark: '#5C5851',
          light: '#AEA99F',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        tight: '-0.01em',
      }
    },
  },
  plugins: [],
}
