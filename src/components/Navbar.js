import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/img/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  let loginDropdownTimeout = null;

  const handleLoginDropdownEnter = () => {
    if (loginDropdownTimeout) clearTimeout(loginDropdownTimeout);
    setIsLoginDropdownOpen(true);
  };
  const handleLoginDropdownLeave = () => {
    loginDropdownTimeout = setTimeout(() => setIsLoginDropdownOpen(false), 120);
  };
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-500 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="#" className="flex items-center" onClick={e => { e.preventDefault(); navigate(user ? '/dashboard' : '/'); }}>
              <img
                src={logo}
                alt="Praan Logo"
                style={{ height: '140px', width: '140px', minWidth: '140px', minHeight: '140px' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white hover:bg-primary-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-righteous transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="relative"
                  onMouseEnter={handleLoginDropdownEnter}
                  onMouseLeave={handleLoginDropdownLeave}
                >
                  <button
                    className="flex items-center text-white px-4 py-2 rounded-full bg-primary-500 shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none"
                    onClick={() => { navigate('/login'); }}
                  >
                    <User className="h-5 w-5 mr-1" fill="currentColor" />
                    <span className="text-sm font-medium">Login</span>
                  </button>
                  {isLoginDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 z-50 bg-primary-500">
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-white"
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:bg-primary-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-primary-700">
              {user ? (
                <div className="space-y-1">
                  <div className="flex items-center px-3 py-2">
                    <User className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white text-base font-medium">{user.name}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="text-white hover:bg-primary-700 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-white hover:bg-primary-700 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className="text-white hover:bg-primary-700 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white hover:bg-primary-700 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
