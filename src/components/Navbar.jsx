import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Apps', path: '/apps' },
    { name: 'Installation', path: '/my-installations' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Navigates to home */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg mr-2 flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Hero Store</span>
          </div>

          {/* Desktop Links & Contribution Button */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' 
                      : 'text-gray-600 hover:text-indigo-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a 
              href="https://github.com/YOUR_GITHUB_PROFILE" // Link to your GitHub profile
              target="_blank" 
              rel="noreferrer"
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Github size={16} /> Contribution
            </a>
          </div>

          {/* Mobile Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a 
              href="https://github.com/YOUR_GITHUB_PROFILE"
              target="_blank" 
              rel="noreferrer"
              className="block bg-gray-900 text-white px-3 py-2 mt-2 rounded-md text-base font-medium text-center hover:bg-gray-800"
            >
              Contribution
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;