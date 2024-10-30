import React from 'react';
import Input from '../component/Input'; // Ensure this path is correct
import { Link } from 'react-router-dom'; // For navigation
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

function Forgot() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show a toast notification
    toast.success('Password reset email sent!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Auto close after 3 seconds
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-10 mt-16 p-4 max-w-4xl">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img 
          src="/assests/forgot.jpg" 
          alt="Forgot Password" 
          className="h-96 w-[500px] rounded-lg shadow-lg" 
        />
      </div>

      {/* Form Section */}
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Forgot Password</h1>
        <p className="text-gray-600 mb-4 text-center md:text-left">
          Please enter your email address below to receive a password reset link.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            name="email" 
            type="email" 
          />
          <button 
            type="submit" // Change to 'submit' for form submission
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Send Password Reset Email
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="mt-6 text-center">
          <p>
            Remember your password? 
            <Link to="/login" className="text-blue-500 hover:underline ml-1">Click here to login</Link>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Forgot;
