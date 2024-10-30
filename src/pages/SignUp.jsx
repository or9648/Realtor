import React, { useState } from 'react';
import Input from '../component/Input';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Import initialized auth from firebaseConfig.js

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Firebase email/password sign-up logic
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed up:', userCredential.user);
        toast.success('Sign up successful!');
        navigate("/"); // Redirect to home page after successful sign-up
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        toast.error('Error signing up: ' + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Google sign-in successful:', result.user);
        toast.success('Google sign-in successful!');
        navigate("/"); // Redirect to home page after successful sign-in
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        toast.error('Error signing in with Google: ' + error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-auto mt-16 p-4 max-w-4xl">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img 
          src="/assests/sign.jpg"  // Ensure the path is correct
          alt="Sign Up" 
          className="h-96 rounded-lg shadow-lg" 
        />
      </div>

      {/* Form Section */}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Name" 
            placeholder="Enter your name" 
            name="name" 
            value={name} 
            setValue={setName} 
          />
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
          <Input 
            label="Confirm Password" 
            placeholder="Confirm your password" 
            name="confirmPassword" 
            value={confirmPassword} 
            setValue={setConfirmPassword} 
            type="password" 
          />
          <button 
            type="submit" 
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <h2 className="text-center mt-4">Or</h2>

        {/* Google Sign-In Button */}
        <button 
          onClick={handleGoogleSignIn} // Trigger Google sign-in on button click
          className="w-full mt-4 flex items-center justify-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faGoogle} />
          </span> 
          Sign up with Google
        </button>

        {/* Redirect to Sign In */}
        <div className="mt-4 text-center">
          <p>
            Already have an account? 
            <Link to="/login" className="text-blue-500 hover:underline ml-1">Click here to sign in</Link>
          </p>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}

export default SignUp;
