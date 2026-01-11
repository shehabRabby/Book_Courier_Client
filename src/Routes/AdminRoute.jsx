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
      <div className="h-screen flex items-center justify-center bg-base-100">
        <FaSpinner className="text-[#6366f1] animate-spin text-5xl opacity-80" />
      </div>
    );
  }

  if (user && role === "admin") return children;

  return <Navigate to="/" replace />;
};

export default AdminRoute;

