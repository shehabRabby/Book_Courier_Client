import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Logo/Loading/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
