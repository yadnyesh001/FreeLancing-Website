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
    <nav className="backdrop-blur-md bg-white/30 border-b border-white/10 sticky top-0 z-50 w-full overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        <div className="grid grid-cols-12 items-center">
          {/* Logo - Fixed in the first 3 columns */}
          <div className="col-span-3">
            <Link to="/" className="text-2xl font-semibold text-gray-900 drop-shadow-lg cursor-pointer block">
              Freelancing Hub
            </Link>
          </div>

          {/* Desktop Navigation - Takes remaining 9 columns */}
          <div className="col-span-9 hidden md:block">
            <div className="flex justify-end space-x-8 text-lg">
              {isLoggedIn ? (
                user?.role === 'admin' ? (
                  <>
                    <Link to="/admindashboard" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                ) : user?.role === 'freelancer' ? (
                  <>
                    <Link to="/freelancerdashboard" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                      Dashboard
                    </Link>
                    <Link to="/find-work" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                      Find Work
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/clientdashboard" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                      Dashboard
                    </Link>
                    <Link to="/find-talent" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                      Find Talent
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                )
              ) : (
                <>
                  <Link to="/find-work" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                    Find Work
                  </Link>
                  <Link to="/find-talent" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                    Find Talent
                  </Link>
                  <Link to="/login" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                    Login
                  </Link>
                  <Link to="/signup" className="text-gray-900 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Only visible on smaller screens */}
          <div className="col-span-9 md:hidden flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 text-3xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-md p-4 space-y-4">
          {isLoggedIn ? (
            user?.role === 'admin' ? (
              <>
                <Link
                  to="/admindashboard"
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
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : user?.role === 'freelancer' ? (
              <>
                <Link
                  to="/freelancerdashboard"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/find-work"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Work
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/clientdashboard"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/find-talent"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Talent
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
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
    </nav>
  );
};

export default Navbar;