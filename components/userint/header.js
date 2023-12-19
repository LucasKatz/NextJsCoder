"use client"

import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartWidget from './CartWidget';
import { useState } from 'react';

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

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const { resetTotalQuantity, clearCart } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className='w-full'>
    <nav className="flex items-center justify-between p-4 w-full text-purple-900 bg-white">
      <div className="flex items-center gap-2 p-4 w-1/4">
        <Link href="/">
          <Image src="/images/logo.jpeg" alt="Logo" width={50} height={70} />
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1 w-1/2">
        {/* Menú desplegable tipo hamburguesa */}
        <div className="md:hidden">
          <button
            className="text-3xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Enlaces del menú en medidas mayores a 768px */}
        <div className="md:flex items-center justify-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`btn-nav ${
                pathname === link.href ? 'font-extrabold font-lobster' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Elementos a la derecha */}
      <div className="flex items-center justify-end space-x-4 p-4 w-1/4">
        {/* Icono de usuario */}
        {user.loggedIn && (
          <div className="relative">
            <button
              className="text-sm text-gray-500 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaUser className="text-3xl" />
            </button>
            {isMenuOpen && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 p-2 rounded flex flex-col">
                <span>{user.email}</span>
                <Link href="/cart">Cart</Link>
                <button onClick={() => console.log('Profile clicked')}>
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    clearCart();
                    resetTotalQuantity();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Icono de CartWidget oculto en medidas menores a 768px */}
        <div className="hidden md:block">
          <CartWidget />
        </div>
      </div>

      {/* Menú desplegable en medidas menores a 768px */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white border border-gray-300 p-2 rounded flex flex-col">
          {user.loggedIn && (
            <>
              <span>{user.email}</span>
              <Link href="/cart">Cart</Link>
              <button onClick={() => console.log('Profile clicked')}>
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  clearCart();
                  resetTotalQuantity();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
    </main>
  );
}
