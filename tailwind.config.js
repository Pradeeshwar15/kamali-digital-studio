/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          dark: "#0a0a0c",
          darker: "#050506",
          card: "#121216",
          border: "#23232c",
          orange: "#FF6B00",
          orangeHover: "#E55F00",
          gold: "#D4AF37",
          goldLight: "#F3E5AB",
          text: "#E2E8F0",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px rgba(255, 107, 0, 0.4)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.3)',
        'frame-3d': '0 20px 40px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
