import React from 'react';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200  shadow">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          {/* Logo and Icon */}
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-yellow-400">Realtor</h1>
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} className="text-yellow-500 text-2xl" />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center space-x-6 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-200">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Contact</a>
            </li>
          </ul>
        </div>

        {/* Divider Line */}
        <hr className="my-6 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-sm">
          <span>
            © 2024 . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
