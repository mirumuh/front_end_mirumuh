/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        jump: 'jump 1s infinite',
        'jump-delay': 'jump 1s infinite 0.2s',
        shadow: 'shadow 1s infinite',
      },
      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shadow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(0.8)', opacity: '0.2' },
        },
      },
      fontFamily: {
        moreSugar: ['MoreSugar', 'sans-serif'],
        moreSugarExtras: ['MoreSugarExtras', 'sans-serif'],
        moreSugarThin: ['MoreSugarThin', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: '#bc915d',
        primary: '#c1e6e9',
        secondary: '#c2eb7d',
        'secondary-hover': '#b2d66c',
        pink: '#ffbbdc',
        'light-pink': '#ffe3e3',
        'light-darker-pink': '#FFCAD3',
        bege: '#FFFBDB',
        blue: '#C2E5E9',
        'light-darker-blue': '#9cdfea',
        'light-darker-brown': '#8d6741',
        purple: '#BCABD3',
        'dark-purple': '#B173B0',
        white: '#FFFFFF',
        brown: '#8E613C',
        'light-brown': '#CF9888',
      },
      backgroundImage: {
        fundo: "url('/images/fundoPixel.png')",
      },
      maxHeight: {
        screenHeader: '70vh',
      },
      height: {
        screenHeader: '70vh',
        96: '24rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        192: '48rem',
      },
      minHeight: {
        screenHeader: '70vh',
        96: '24rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        192: '48rem',
      },
    },
  },
  plugins: [],
}
