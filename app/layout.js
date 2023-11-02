import { Inter } from 'next/font/google'
import Navbar from '@/components/userint/header'
import Footer from '@/components/userint/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Night Owl Resources',
  description: 'Generated by create next app',
  developer: "Lucas Katz"
}

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
