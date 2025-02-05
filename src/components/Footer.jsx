import React from 'react';
import { NavLink } from 'react-router-dom';
import { Twitter, Facebook, LinkedIn, GitHub, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="  bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8 px-6 w-full">
      <div className="max-w-full mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CryptoPulse
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for cryptocurrency insights and market analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <div className="space-y-2">
              <NavLink to="/" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Home
              </NavLink>
              <NavLink to="/cryptocurrencies" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Cryptocurrencies
              </NavLink>
              <NavLink to="/exchanges" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Exchanges
              </NavLink>
              <NavLink to="/news" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                News
              </NavLink>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                API Documentation
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Market Data
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Research Reports
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Help Center
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CryptoPulse. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Twitter fontSize="small" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Facebook fontSize="small" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <LinkedIn fontSize="small" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <GitHub fontSize="small" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Instagram fontSize="small" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;