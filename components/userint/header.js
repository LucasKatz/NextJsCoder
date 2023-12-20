"use client"

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartWidget from './CartWidget';

const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/products/all',
  },
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const { resetTotalQuantity } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 w-full text-purple-900 bg-white">
      <div className="flex items-center gap-2 p-4 w-1/4">
        <Link href="/">
          <Image src="/images/logo.jpeg" alt="Logo" width={50} height={70} />
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1 w-1/2">
        {links.map(link => (
          <Link key={link.label} href={link.href} className={`btn-nav ${pathname === link.href ? "font-extrabold font-lobster" : ""}`}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Menu hamburguesa para pantallas pequeñas */}
      <div className="block md:hidden relative ml-auto">
        <button
          className="text-xl text-purple-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {isMenuOpen && (
          <div className="absolute top-0 right-full bg-white border border-gray-300 p-2 rounded flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`btn-nav ${pathname === link.href ? 'font-extrabold font-lobster' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {user.loggedIn ? (
              <>
                <Link href="/profile">Profile</Link>
                <button onClick={() => { logout(); resetTotalQuantity(); }}>Logout</button>
              </>
            ) : (
              <Link href="/signup">
                <FaUser className="text-3xl" />
              </Link>
            )}

            <CartWidget />
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center justify-start space-x-4 p-4 w-1/4">
        {user.loggedIn ? (
          <div className="relative">
            <button
              className="text-sm text-gray-500 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {user.email}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className='hidden md:flex row'>
      <Link href="/signup">
        <FaUser className='text-3xl mr-5'/>
      </Link>

      <CartWidget/>
    </div>
    </nav>
  );
};

export default Navbar;
