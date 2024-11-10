import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  console.log(auth.isLoggedIn);
  if (!auth.isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  // Render the children if the user is authenticated
  return children;
};

export default ProtectedRoute;
