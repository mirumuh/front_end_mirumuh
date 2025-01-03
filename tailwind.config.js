/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        pink: '#ffbbdc',
        'light-pink': '#ffe3e3',
        bege: '#FFFBDB',
        blue: '#C2E5E9',
        'light-darker-blue': '#9cdfea',
        'light-darker-brown': '#8d6741',
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
