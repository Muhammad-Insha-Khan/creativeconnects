import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login and prevent forward-back trick
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
