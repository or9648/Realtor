// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook for authentication status

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get current user status from your auth context or hook

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
