// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import Cookies from 'js-cookie';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // Check for the cookie on component mount
//   useEffect(() => {
//     const token = Cookies.get('jwt-freelancing'); // Replace with your actual cookie name
//     if(token) {
//       setIsLoggedIn(true);
//     }
//   }, []);


//   const handleLogout = async () => {
//     try {
//       // Make a request to the backend logout route
//       await axios.get('http://localhost:3000/api/v1/auth/logout', {
//         withCredentials: true, // Send cookies with the request
//       });
  
//       // Clear the cookie on the frontend
//       // Cookies.remove('jwt-freelancing');
      
//       // Update state and navigate to the homepage
//       setIsLoggedIn(false);
//       navigate('/');
//     } catch (error) {
//       console.error('Error during logout:', error.message);
//     }
//   };
//   return (
//     <nav className="backdrop-blur-md bg-white/30 border-b border-white/10 sticky top-0 z-50">
//       <div className="container mx-auto p-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-semibold text-gray-900 drop-shadow-lg">
//             Freelancing Hub
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-6 text-lg">
//             <Link 
//               to="/" 
//               className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
//             >
//               Home
//             </Link>
//             {!isLoggedIn ? (
//               <>
//                 <Link 
//                   to="/dashboard" 
//                   className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link 
//                   to="/login" 
//                   className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/signup" 
//                   className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                 >
//                   Signup
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden text-gray-900 text-3xl"
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white/30 backdrop-blur-md p-4 space-y-4">
//             <Link 
//               to="/" 
//               className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Home
//             </Link>
//             {isLoggedIn ? (
//               <>
//                 <Link 
//                   to="/dashboard" 
//                   className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link 
//                   to="/login" 
//                   className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/signup" 
//                   className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Signup
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import axios from 'axios'; // Missing import
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for the cookie on component mount
  useEffect(() => {
    const token = Cookies.get('jwt-freelancing'); // Get token from cookies

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the backend logout route
      await axios.get('http://localhost:3000/api/v1/auth/logout', {
        withCredentials: true, // Send cookies with the request
      });

      // Clear the cookie on the frontend
      Cookies.remove('jwt-freelancing');
      
      // Update state and navigate to the homepage
      setIsLoggedIn(false);
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
          <Link to="/" className="text-2xl font-semibold text-gray-900 drop-shadow-lg">
            Freelancing Hub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Link 
              to="/" 
              className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              Home
            </Link>
            {isLoggedIn ? ( // Show Dashboard and Logout if logged in
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : ( // Show Login and Signup if not logged in
              <>
                <Link 
                  to="/login" 
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
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
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/30 backdrop-blur-md p-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-900 hover:text-gray-600 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isLoggedIn ? ( // Show Dashboard and Logout if logged in
              <>
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
            ) : ( // Show Login and Signup if not logged in
              <>
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
