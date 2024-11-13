/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: '#bc915d',
        primary: '#c1e6e9',
        secondary: '#c2eb7d',
        pink: '#ffbbdc',
        bege: '#FFFBDB',
        blue: '#C2E5E9',
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
