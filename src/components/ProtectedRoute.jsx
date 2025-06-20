import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext'; 


function ProtectedRoute({ element: Element, ...rest }) { 
  const { currentUser, loading } = useAuth(); 

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />; 
  }

  return <Element {...rest} />; 
}

export default ProtectedRoute;