import React from "react";
import { Navigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useRole from "../Role/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
        <FaSpinner className="text-[#ff0077] animate-spin text-5xl" />
      </div>
    );
  }

  if (user && role === "admin") return children;

  return <Navigate to="/" replace />;
};

export default AdminRoute;
