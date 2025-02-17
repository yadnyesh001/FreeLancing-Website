import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in (using localStorage for simplicity)
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('user') // Clear user data
    setIsLoggedIn(false)
    navigate('/') // Redirect to home after logout
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              FreelanceSite
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-600 hover:text-gray-800">
                  Signup
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-600 hover:text-gray-800">
              Home
            </Link>
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="block text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link to="/signup" className="block text-gray-600 hover:text-gray-800">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
