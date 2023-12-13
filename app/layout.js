import { Inter } from 'next/font/google'
import './(shop)/globals.css'
import { CartProvider } from '../components/context/CartContext'
import { AuthProvider } from '@/components/context/AuthContext'

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
        <AuthProvider>
        <CartProvider>
        {children}
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
