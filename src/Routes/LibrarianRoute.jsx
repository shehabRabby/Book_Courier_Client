import React from "react";
import { Navigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import useRole from "../Role/useRole";
import useAuth from "../Hooks/useAuth";


const LibrarianRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
        <FaSpinner className="text-[#00c853] animate-spin text-5xl" />
      </div>
    );
  }
    
    // Check if the user is logged in AND has the required role (librarian or admin)
  if (user && (role === "librarian" || role === "admin")) {
    return children;
  }
  return <Navigate to="/" replace />;
};
export default LibrarianRoute;
