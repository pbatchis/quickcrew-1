import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Redirects signed‐in users away from guest routes (e.g. /signin, /signup)
export const GuestRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  return user ? <Navigate to="/" replace /> : children;
};
