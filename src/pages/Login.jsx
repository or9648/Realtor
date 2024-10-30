import React, { useState } from 'react';
import Input from '../component/Input'; // Make sure this path is correct
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Firebase login logic
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        toast.success('Logged in successfully!');
        navigate('/'); // Redirect to home page or another page after login
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        toast.error('Login failed: ' + error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-auto mt-16 p-4 max-w-4xl">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img 
          src="/assests/sign.jpg" 
          alt="Login" 
          className="h-96 rounded-lg shadow-lg" 
        />
      </div>

      {/* Form Section */}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            name="email" 
            value={email} 
            setValue={setEmail} 
            type="email" 
          />
          <Input 
            label="Password" 
            placeholder="Enter your password" 
            name="password" 
            value={password} 
            setValue={setPassword} 
            type="password" 
          />
          <button 
            type="submit" 
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link to="/forgot" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Redirect to Sign Up */}
        <div className="mt-4 text-center">
          <p>
            Don't have an account? 
            <Link to="/signup" className="text-blue-500 hover:underline ml-1">Click here to sign up</Link>
          </p>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
