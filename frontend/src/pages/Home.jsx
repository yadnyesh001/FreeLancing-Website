import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx' // Import the Navbar component

const Home = () => {
  return (
    <div>
      <Navbar /> {/* Add Navbar here */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Freelancing Website</h1>
        <p className="text-lg text-gray-600 mb-8">Connect with clients or find your next project</p>
        
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
