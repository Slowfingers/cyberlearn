/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Rajdhani"', 'sans-serif'],
      },
      colors: {
        cyber: {
          black: '#050505',
          dark: '#09090b',
          panel: '#12121a',
          neonBlue: '#00f3ff',
          neonPink: '#ff00ff',
          neonGreen: '#00ff41',
          neonYellow: '#fcee0a',
          glass: 'rgba(18, 18, 26, 0.8)',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        scan: {
          '0%': { backgroundPosition: '0 -100vh' },
          '100%': { backgroundPosition: '0 100vh' }
        }
      }
    },
  },
  plugins: [],
}
