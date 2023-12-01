import { Inter } from 'next/font/google'
import Navbar from '@/components/userint/header'
import Footer from '@/components/userint/footer'
import './globals.css'
import { CartProvider } from '../context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Night Owl Resources',
  description: 'Generated by create next app',
  developer: "Lucas Katz"
}

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body className="bg-giphy-background" >
        <CartProvider>
        <Navbar/>
        {children}
        <Footer/>
        </CartProvider>
      </body>
    </html>
  )
}
