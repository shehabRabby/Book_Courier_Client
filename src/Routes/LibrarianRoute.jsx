import React from "react";
import { Navigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import useRole from "../Role/useRole";

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
  if (user && (role === "librarian" || role === "admin")) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default LibrarianRoute;
