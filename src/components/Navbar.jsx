import React from 'react';
import { NavLink } from 'react-router-dom';

const CryptoLogo = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <circle cx="50" cy="50" r="45" fill="white" />
    <path d="M50 20L65 45L50 55L35 45L50 20Z M35 55L50 65L65 55L50 80L35 55Z" fill="#1a1b23" strokeWidth="2" />
  </svg>
);

const pages = [
  { name: 'Home', path: '/', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1a1 1 0 0 0 .7-1.7L12 2.7a1 1 0 0 0-1.4 0l-8.3 8.6A1 1 0 0 0 3 13z"/>
    </svg>
  )},
  { name: 'Cryptocurrencies', path: '/cryptocurrencies', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M4.2 2.3L12 5.5l7.8-3.2L21 3.5l-9 3.7-9-3.7zm0 5L12 10.5l7.8-3.2L21 8.5l-9 3.7-9-3.7zm9 8.7l9-3.7v4.2l-9 3.7-9-3.7v-4.2z"/>
    </svg>
  )},
  { name: 'Exchanges', path: '/exchanges', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M19 8l-4 4h3c0 3.31-2.69 6-6 6c-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6c1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4l4-4H6z"/>
    </svg>
  )},
  { name: 'News', path: '/news', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/>
    </svg>
  )}
];

const Navbar = () => {
  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <div className="p-4 flex items-center space-x-2">
        <CryptoLogo />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-500 transition-all duration-300">
          CryptoPulse
        </h1>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent my-4" />
      <nav className="flex-1">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            className={({ isActive }) => `w-full px-6 py-3 flex items-center space-x-4 transition-all duration-200 
              ${isActive ? 'bg-white/10 border-r-4 border-blue-400' : 'hover:bg-white/5'}`}
          >
            <span className={({ isActive }) => `${isActive ? 'text-blue-400' : 'text-gray-300'}`}>
              {page.icon}
            </span>
            <span className={({ isActive }) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300'}`}>
              {page.name}
            </span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 text-center text-sm text-gray-500">
        <p>v1.0.0</p>
      </div>
    </div>
  );
};

export default Navbar;