"use client"

import { useState } from 'react';
import Link from 'next/link';

const links = [
  {
    label: 'Todos',
    href: '/all',
  },
  {
    label: 'Vocabulario',
    href: '/vocabulary',
  },
  {
    label: 'Historias',
    href: '/stories',
  },
  {
    label: 'Rutinas',
    href: '/routines',
  },
  {
    label: 'Deco',
    href: '/deco',
  },
  {
    label: 'Personal',
    href: '/personal',
  },
];

const CategoriesMenu = ({ language }) => {


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
                <Link key={link.label} href={`/productos/${language}${link.href}`} className="btn-nav">
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

