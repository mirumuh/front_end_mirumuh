import './globals.css'
import { Poppins } from 'next/font/google'
import LayoutWrapper from './components/LayoutWrapper'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Ateliê da Mirumuh',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={poppins.className}>
      <head>
        <link rel='icon' href='/icons/logo_marcado.png' />
      </head>
      <body className={`antialiased background overflow-hidden`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
