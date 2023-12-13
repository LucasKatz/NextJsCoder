import { Inter } from 'next/font/google'
import Navbar from '@/components/userint/header'
import Footer from '@/components/userint/footer'
import "../(shop)/globals.css"


const inter = Inter({ subsets: ['latin'] })


export default function ShopLayout({ children}) {
    return (
    <html lang="en">
        <body className="bg-giphy-background" >

        <Navbar/>
        {children}
        <Footer/>

        </body>
    </html>
    )
}
