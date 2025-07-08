import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/img/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary-500 text-white pt-16 pb-8 px-4 md:px-0 relative w-full">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center">
              <span className="text-xl font-bold">Prana</span>
            </div>
            <p className="mb-4 text-gray-100">Empowering healthcare with modern technology. Streamline operations, enhance patient care, and manage your hospital efficiently with Prana.</p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="bg-white text-primary-500 rounded-full p-2 hover:bg-accent-500 hover:text-white transition-colors duration-200"><FaFacebookF /></a>
              <a href="#" className="bg-white text-primary-500 rounded-full p-2 hover:bg-accent-500 hover:text-white transition-colors duration-200"><FaTwitter /></a>
              <a href="#" className="bg-white text-primary-500 rounded-full p-2 hover:bg-accent-500 hover:text-white transition-colors duration-200"><FaInstagram /></a>
              <a href="#" className="bg-white text-primary-500 rounded-full p-2 hover:bg-accent-500 hover:text-white transition-colors duration-200"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent-200">About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent-200">Services</Link></li>
              <li><Link to="/contact" className="hover:text-accent-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-accent-200">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-accent-200">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-accent-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent-200">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:info@praanhospital.com" className="hover:text-accent-200">info@pranahospital.com</a></li>
              <li>Phone: <a href="tel:+15551234567" className="hover:text-accent-200">+1 (555) 123-4567</a></li>
              <li>Address: 123 Main St, City, State</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-300 pt-6 text-center text-sm text-primary-100">
          &copy; {new Date().getFullYear()} Prana. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 