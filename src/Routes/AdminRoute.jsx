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

// 🛑 SECURITY WARNING:
// This component is only a User Interface (UI) gate. 
// For real security, every backend API endpoint accessed from the admin routes 
// MUST contain middleware to verify the user's JWT token and confirm their 'admin' role. 
// Otherwise, the application is vulnerable to unauthorized administrative actions.