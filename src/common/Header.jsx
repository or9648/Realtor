import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig'; // Import your Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Header() {
  const [user, setUser] = useState(null); // State to track if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state based on login status
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/login'); // Redirect to login page after logout
      })
      .catch((error) => {
        toast.error('Logout failed: ' + error.message); // Display error message
      });
  };

  return (
    <div className="bg-gray-900 text-white p-4 w-full fixed top-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Icon */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Realtor</h1>
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} className="text-yellow-500 text-xl" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-yellow-500 font-semibold" : "text-white hover:text-yellow-500"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              isActive ? "text-yellow-500 font-semibold" : "text-white hover:text-yellow-500"
            }
          >
          dashboard
          </NavLink>
          <NavLink 
            to="/offers" 
            className={({ isActive }) => 
              isActive ? "text-yellow-500 font-semibold" : "text-white hover:text-yellow-500"
            }
          >
            Offers
          </NavLink>

          {user ? (
            // Show logout button if user is logged in
            <button 
              onClick={handleLogout} 
              className="text-white hover:text-yellow-500 font-semibold"
            >
              Logout
            </button>
          ) : (
            // Show login and signup links if user is not logged in
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  isActive ? "text-yellow-500 font-semibold" : "text-white hover:text-yellow-500"
                }
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className={({ isActive }) => 
                  isActive ? "text-yellow-500 font-semibold" : "text-white hover:text-yellow-500"
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
