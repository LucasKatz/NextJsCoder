"use client"

import { FaUser, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import CartWidget from './CartWidget';
import { useState } from 'react';



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
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuthContext(); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {links.map(link => (
          <Link key={link.label} href={link.href} className={`btn-nav ${pathname === link.href ? "font-extrabold font-lobster" : ""}`}>
            {link.label}
          </Link>
        ))}
      </div>

    <div className="flex items-center justify-end space-x-4 p-4 w-1/4">
  {user.loggedIn ? (

    <div className="relative">
      <button
        className="text-sm text-gray-500 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {user.email}
      </button>
      {isMenuOpen && (
        <div className="absolute top-8 left-0 bg-white border border-gray-300 p-2 rounded flex flex-col">
          <button onClick={() => console.log('Profile clicked')}>Profile</button>
          <button onClick={() => console.log('Logout clicked')}>Logout</button>
        </div>
      )}
    </div>
  ) : (

    <>
      <Link href="/login">
        <FaUser className='text-3xl'/>
      </Link>
    </>
  )}
  <CartWidget/>
</div>


    </nav>
  );  
}
