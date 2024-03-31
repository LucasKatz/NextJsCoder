"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    label: 'Todos',
    href: '/products/all',
  },

  {
    label: 'Vocabulario',
    href: '/products/vocabulary',
  },
  {
    label: 'Historias',
    href: '/products/stories',
  },
  {
    label: 'Rutinas',
    href: '/products/routines',
  },
  {
    label: 'Deco',
    href: '/products/deco',
  },

  {
    label: 'Spanish',
    href: '/productos/spanish',
  },

  {
    label: 'english',
    href: '/productos/english',
  },
];

const languageFilters = [
  {
    label: 'spanish',
    value: 'spanish',
  },
  {
    label: 'english',
    value: 'english',
  },
];

const CategoriesMenu = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
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

          <div className="mt-4">
            <p className="text-gray-700 font-semibold mb-2">Filter by language:</p>
            {languageFilters.map((filter) => (
              <Link key={filter.value} href={`/products/all/${filter.value}`} onClick={() => handleLanguageChange(filter.value)} className={`btn-nav ${selectedLanguage === filter.value ? "font-extrabold" : ""}`}>
                {filter.label}
              </Link>
            ))}
          </div>

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
