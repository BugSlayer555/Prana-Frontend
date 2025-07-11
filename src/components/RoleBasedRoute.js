import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Role-based route protection
const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If no specific roles are required, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is in the allowed roles
  if (allowedRoles.includes(user.role)) {
    return children;
  }

  // Redirect to dashboard if user doesn't have access
  return <Navigate to="/dashboard" />;
};

export default RoleBasedRoute; 