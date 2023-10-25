"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Navbar() {
  const [isProductsOpen, setProductsOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center gap-2">
        <Link href="#">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={100}
            height={40}
          />
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-4 flex-1">
        <Link href="/">
          <button className="nav-link">Home</button>
        </Link>
        <button onClick={toggleProducts} className="nav-link">
          Products
        </button>
        {isProductsOpen && (
          <div className="absolute top-full left-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md w-48">
            <Link href="/category1">
              <button className="nav-link">Cat 1</button>
            </Link>
            <Link href="/category2">
              <button className="nav-link">Cat 2</button>
            </Link>
            <Link href="/category3">
              <button className="nav-link">Cat 3</button>
            </Link>
          </div>
        )}
        <Link href="/about">
          <button className="nav-link">About Us</button>
        </Link>
        <Link href="/contact">
          <button className="nav-link">Contact</button>
        </Link>
        <Link href="/cart">
          <button className="nav-link">Cart</button>
        </Link>

        <Link href="/login">
          <button className="nav-link">Login</button>
        </Link>
        <Link href="/signup">
          <button className="nav-link">Signup</button>
        </Link>
      </div>
    </nav>
  );
}
