"use client"

import { FaUser, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CartWidget from './CartWidget';
import Cart from '@/app/(shop)/cart/page';

const links = [ 
  {
    label:"Home",
    href:"/"
  },
  {
    label:"Products",
    href:"/products/todos"
  },
  {
    label:"About Us",
    href:"/about"
  },
  {
    label:"Contact",
    href:"/contact"
  }
]


export default function Navbar() {


  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between p-4 w-full text-purple-900 bg-white">

  <div className="flex items-center gap-2 p-4 w-1/4">
    <Link href="/">
      <Image
        src="/images/logo.jpeg"
        alt="Logo"
        width={50}
        height={70}
      />
    </Link>
  </div>

  <div className="hidden md:flex items-center justify-center flex-1 w-1/2">
{
links.map(link => (
  <Link key={link.label} href={link.href} className={`btn-nav ${pathname === link.href ? "font-extrabold font-lobster" : ""}`}>
    {link.label}
  </Link>
))
}
  </div>

  <div className="flex items-center justify-end space-x-4 p-4 w-1/4">
    <Link href="/login">
      <FaUser className='text-3xl'/>
    </Link>
    <CartWidget/>
  </div>
</nav>

  )  
}
