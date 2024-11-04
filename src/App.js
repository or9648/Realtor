// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Offers from './pages/Offers';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './component/ProtectedRoute';
import Forgot from './pages/Forgot';
import Category from './pages/Category';
import Footer from './common/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/category/:id" element={
          <ProtectedRoute>
<Category/>
          </ProtectedRoute>
         } />
        {/* Protected Route for Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
