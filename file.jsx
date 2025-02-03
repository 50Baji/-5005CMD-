/* Cat */
import { useState } from 'react';
import Searchbar from './Searchbar'; // Import Searchbar component

const Cat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mt-20 h-16 flex items-center justify-between fixed top-20 left-0 right-0 bg-white shadow-xl z-40 mx-auto px-6 sm:px-8 lg:px-12 xl:px-15 max-w-full md:h-24 sm:max-w-7xl hidden md:flex"> {/* Added hidden md:flex */}
      {/* Left Side (menu items) */}
      <div className="flex flex-col md:flex-row md:gap-4 font-medium">
        <div className="flex gap-12 md:flex-row md:gap-4">
          <a href="/" className="text-gray-800 hover:text-green-500 transition-colors m ps-0">Home</a>
          <a href="/" className="ps-10 text-gray-800 hover:text-green-500 transition-colors">Most Seen</a>
        </div>
        <div className="flex gap-16 md:flex-row md:gap-4">
          <a href="/" className="md:ml-10 text-gray-800 hover:text-green-500 transition-colors">Trending</a>
          <a href="/" className="pe-10 md:ml-10 text-gray-800 hover:text-green-500 transition-colors sm:ml-0 sm:text-left">About</a>
        </div>
      </div>

      {/* Searchbar on the right side */}
      <div className="flex items-center border md:w-auto md:h-auto rounded-full border-gray-300 overflow-hidden">
        <Searchbar />
      </div>
    </div>
  );
};

export default Cat;


/* Searchbar */
import React, { useState } from 'react';

const Searchbar = () => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center resize hidden md:flex"> {/* Hidden on small screens, visible on medium and larger screens */}
      <div className="w-full max-w-sm">
        <div className="flex overflow-hidden rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            placeholder="Search Tag"
            value={query}
            onChange={handleSearchChange}
            className="w-full rounded-l-md px-10 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-green-700 px-3.5 text-white rounded-r-md hover:bg-green-800 transition-colors duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;




/* Navbar */

import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 sm:h-13 md:h-16 lg:h-16 flex items-center justify-between fixed top-0 md:top-4 lg:top-5 left-0 right-0 bg-white shadow-xl rounded-none md:rounded-3xl lg:rounded-full z-50 mx-auto px-6 sm:px-8 lg:px-12 xl:px-15 max-w-full sm:max-w-7xl">
      {/* Logo */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <img src="/logo.jpeg" className="w-8 h-8 object-cover" alt="Komodo" />
        <span className="text-gray-800">Komodo Hub</span>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="cursor-pointer text-4xl text-gray-800" onClick={() => setOpen((prev) => !prev)}>
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </div>

        {/* Dropdown menu */}
        <div
          className={`w-full h-screen flex flex-col items-center gap-6 text-lg font-medium justify-center absolute top-16 left-0 bg-slate-800 text-white transition-all ease-in-out ${open ? "opacity-100 z-50 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"}`}
        >
          <a href="/" className="hover:text-green-500 transition-colors">Home</a>
          <a href="/" className="hover:text-green-500 transition-colors">Most Seen</a>
          <a href="/" className="hover:text-green-500 transition-colors">Trending</a>
          <a href="/" className="hover:text-green-500 transition-colors">About</a>
          <a href="/" className="hover:text-green-500 transition-colors">
            <button className="px-6 py-2 rounded-3xl bg-green-700 text-white hover:bg-green-800 transition-colors">Login</button>
          </a>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <a href="/" className="text-gray-800 hover:text-green-500 transition-colors">Home</a>
        <a href="/" className="text-gray-800 hover:text-green-500 transition-colors">Most Seen</a>
        <a href="/" className="text-gray-800 hover:text-green-500 transition-colors">Trending</a>
        <a href="/" className="text-gray-800 hover:text-green-500 transition-colors">About</a>
        <a href="/" className="text-gray-800 hover:text-green-500 transition-colors">
          <button className="px-6 py-2 rounded-3xl bg-green-700 text-white hover:bg-green-800 transition-colors">Login</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
