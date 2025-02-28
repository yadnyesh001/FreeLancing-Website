import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/auth.js';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/auth/logout', {
        withCredentials: true,
      });
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <nav className="backdrop-blur-md bg-white/30 border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to={user?.role === 'admin' ? '/admindashboard' : '/'}
            className="text-2xl font-semibold text-gray-900 drop-shadow-lg"
          >
            Freelancing Hub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-lg">
            {isLoggedIn ? (
              user?.role === 'admin' ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/find-work" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                    Find Work
                  </Link>
                  <Link to="/find-talent" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                    Find Talent
                  </Link>
                  <Link to="/dashboard" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
               <Link to="/find-work" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                    Find Work
                  </Link>
                  <Link to="/find-talent" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                    Find Talent
                  </Link>
                <Link to="/login" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-900 text-3xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/30 backdrop-blur-md p-4 space-y-4">
            {isLoggedIn ? (
              user?.role === 'admin' ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/find-work"
                    className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find Work
                  </Link>
                  <Link
                    to="/find-talent"
                    className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find Talent
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                  <Link
                    to="/find-work"
                    className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find Work
                  </Link>
                  <Link
                    to="/find-talent"
                    className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find Talent
                  </Link>
                <Link
                  to="/login"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
