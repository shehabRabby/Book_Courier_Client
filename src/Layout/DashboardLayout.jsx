import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Logo from "../Components/Logo/Logo";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useRole from "../Role/useRole";

const allDashboardLinks = [
  // --- User Links ---
  {
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "fas fa-user-circle",
    roles: ["user", "librarian", "admin"],
  },
  {
    name: "My Orders",
    path: "/dashboard/my-orders",
    icon: "fas fa-box-open",
    roles: ["user", "librarian", "admin"],
  },
  {
    name: "Invoices",
    path: "/dashboard/invoices",
    icon: "fas fa-file-invoice-dollar",
    roles: ["user", "librarian", "admin"],
  },
  {
    name: "My Wishlist",
    path: "/dashboard/my-wishlist",
    icon: "fas fa-heart",
    roles: ["user", "librarian", "admin"],
  },

  // --- Librarian Links ---
  {
    name: "Add Book",
    path: "/dashboard/add-book",
    icon: "fas fa-book-medical",
    roles: ["librarian", "admin"],
  },
  {
    name: "My Books",
    path: "/dashboard/my-books",
    icon: "fas fa-book",
    roles: ["librarian", "admin"],
  },
  {
    name: "Orders (Librarian)",
    path: "/dashboard/all-orders",
    icon: "fas fa-truck-loading",
    roles: ["librarian", "admin"],
  },

  // --- Admin Links ---
  {
    name: "Manage Books (Admin)",
    path: "/dashboard/manage-books",
    icon: "fas fa-book-reader",
    roles: ["admin"],
  },
  {
    name: "All Users",
    path: "/dashboard/all-users",
    icon: "fas fa-users-cog",
    roles: ["admin"],
  },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <FaSpinner className="text-[#ff0077] animate-spin text-5xl" />
      </div>
    );
  }

  const currentUserName = user?.displayName || "Guest User";
  const currentUserImage =
    user?.photoURL || "https://via.placeholder.com/150/ff0077/ffffff?text=User";

  const filteredLinks = allDashboardLinks.filter((link) =>
    link.roles.includes(role)
  );

  const getLinkClass = ({ isActive }) => {
    const baseClasses =
      "flex items-center p-3 rounded-lg font-medium transition duration-150 ease-in-out";
    const hoverClass = "hover:bg-base-200";
    const activeClass = "text-[#ff0077] bg-[rgba(255,0,119,0.15)] shadow-sm";
    const inactiveClass = "text-base-content opacity-80";

    return `${baseClasses} ${
      isActive ? activeClass : `${inactiveClass} ${hoverClass}`
    }`;
  };

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed z-40 lg:static transition-transform duration-300 ease-in-out 
                           w-64 h-full bg-base-100 shadow-2xl overflow-y-auto
                           ${
                             isSidebarOpen
                               ? "translate-x-0"
                               : "-translate-x-full"
                           } 
                           lg:translate-x-0 border-r border-base-300`}
      >
        <NavLink
          to="/"
          className="sticky top-0 p-6 flex items-center space-x-2 text-2xl font-bold text-[#ff0077] bg-base-100 border-b border-base-300 z-50 hover:bg-base-200 transition duration-150"
          onClick={() => setIsSidebarOpen(false)}
        >
          <i className="fas fa-book text-3xl"></i>
          <Logo></Logo>
        </NavLink>

        <nav className="p-4 space-y-2">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={getLinkClass}
              onClick={() => setIsSidebarOpen(false)}
              end
            >
              <i className={`${link.icon} w-5 mr-3`}></i>
              {link.name}
            </NavLink>
          ))}

          <div className="border-t border-base-300 pt-4 mt-4">
            <NavLink
              to="/"
              className="flex items-center p-3 rounded-lg font-medium text-base-content opacity-70 hover:bg-base-200 transition duration-150"
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fas fa-arrow-circle-left w-5 mr-3"></i>
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-10 p-4 bg-base-100 shadow-sm border-b border-base-300 flex justify-between items-center">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-base-200 text-[#ff0077]"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="text-2xl">
              {isSidebarOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
            </div>
          </button>

          <h1 className="text-xl font-bold text-base-content hidden lg:block ml-2">
            Dashboard ({role?.toUpperCase() || "USER"})
          </h1>

          {/* User Profile */}
          <div className="flex items-center space-x-3 ml-auto">
            <span className="text-sm font-semibold text-base-content opacity-80 hidden md:inline">
              {currentUserName}
            </span>
            <Link to="/dashboard/my-profile">
              <img
                src={currentUserImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-[#ff0077] hover:scale-105 transition-transform"
              />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ user }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
