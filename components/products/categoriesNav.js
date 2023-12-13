"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    label: 'All',
    href: '/products/all',
  },
  {
    label: 'Vocabulary',
    href: '/products/vocabulary',
  },
  {
    label: 'Stories',
    href: '/products/stories',
  },
  {
    label: 'Routines',
    href: '/products/routines',
  },
  {
    label: 'Deco',
    href: '/products/deco',
  },
];

const CategoriesMenu = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="btn-nav text-purple-900 bg-white ml-5 my-5 rounded-md"
      >
        Menu
      </button>

      {menuOpen && (
        <div className="absolute top-0 left-0 w-88 p-4 bg-white border border-gray-300 z-10">
          <ul>
            {links.map((link) => (
              <li key={link.label}>
 <Link key={link.label} href={link.href} className={`btn-nav ${pathname === link.href ? "font-extrabold" : ""}`}>
        {link.label}
    </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleMenu}
            className="btn-nav text-purple-900 mt-4"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesMenu;
