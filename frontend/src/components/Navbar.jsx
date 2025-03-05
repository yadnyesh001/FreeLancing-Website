import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { axiosInstance } from '../lib/axios';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // Function to get the correct dashboard path based on user role
  const getDashboardPath = () => {
    if (!isLoggedIn) return '/';
    
    switch (user?.role) {
      case 'admin':
        return '/admindashboard';
      case 'freelancer':
        return '/freelancerdashboard';
      case 'client':
        return '/clientdashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="backdrop-blur-md bg-white/30 border-b border-white/10 sticky top-0 z-50 w-full overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        <div className="grid grid-cols-12 items-center">
          {/* Logo - Now directs to appropriate dashboard when logged in */}
          <div className="col-span-3">
            <Link 
              to={getDashboardPath()} 
              className="text-2xl font-semibold text-gray-900 drop-shadow-lg cursor-pointer block"
            >
              Freelancing Hub
            </Link>
          </div>

          {/* Rest of the navbar remains the same */}
          <div className="col-span-9 hidden md:block">
            <div className="flex justify-end space-x-8 text-lg">
              {isLoggedIn ? (
                user?.role === 'admin' ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                ) : user?.role === 'freelancer' ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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