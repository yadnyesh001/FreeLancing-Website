import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center">
      <p>&copy; 2025 FreelanceHub. All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="/" className="hover:text-white">
          Home
        </a>
        <a href="/services" className="hover:text-white">
          Services
        </a>
        <a href="/about" className="hover:text-white">
          About
        </a>
        <a href="/contact" className="hover:text-white">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
