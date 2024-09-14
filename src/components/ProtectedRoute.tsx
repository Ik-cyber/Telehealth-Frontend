import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


const ProtectedRoute: React.FC = () => {
//   const { user } = useAuth();

const token = localStorage.getItem("token")
  if (!token) {
 
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
