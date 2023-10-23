import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { authenticated, user } = useSelector((state) => state?.auth);
  const location = useLocation();
  if (authenticated && user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} />;
}

export default PrivateRoute;
