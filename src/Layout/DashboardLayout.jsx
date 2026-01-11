import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Logo from "../Components/Logo/Logo";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useRole from "../Role/useRole";
import ThemeToggle from "../Components/ThemeToggle/ThemeToggle"; // Import toggle component

const allDashboardLinks = [
  // ... (apnar ager links gulo ekhane thakbe)
  { name: "My Profile", path: "/dashboard/my-profile", icon: "fas fa-user-circle", roles: ["user", "librarian", "admin"] },
  { name: "My Orders", path: "/dashboard/my-orders", icon: "fas fa-box-open", roles: ["user", "librarian", "admin"] },
  { name: "Invoices", path: "/dashboard/invoices", icon: "fas fa-file-invoice-dollar", roles: ["user", "librarian", "admin"] },
  { name: "My Wishlist", path: "/dashboard/my-wishlist", icon: "fas fa-heart", roles: ["user", "librarian", "admin"] },
  { name: "Add Book", path: "/dashboard/add-book", icon: "fas fa-book-medical", roles: ["librarian", "admin"] },
  { name: "My Books", path: "/dashboard/my-books", icon: "fas fa-book", roles: ["librarian", "admin"] },
  { name: "Orders (Librarian)", path: "/dashboard/all-orders", icon: "fas fa-truck-loading", roles: ["librarian", "admin"] },
  { name: "Manage Books (Admin)", path: "/dashboard/manage-books", icon: "fas fa-book-reader", roles: ["admin"] },
  { name: "All Users", path: "/dashboard/all-users", icon: "fas fa-users-cog", roles: ["admin"] },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <FaSpinner className="text-primary animate-spin text-5xl" />
      </div>
    );
  }

  const currentUserName = user?.displayName || "Guest User";
  const currentUserImage = user?.photoURL || "https://via.placeholder.com/150";

  const filteredLinks = allDashboardLinks.filter((link) =>
    link.roles.includes(role)
  );

  const getLinkClass = ({ isActive }) => {
    const baseClasses = "flex items-center p-3 rounded-xl font-bold transition-all duration-300 mb-1 tracking-tight";
    const activeClass = "bg-primary/10 text-primary border-r-4 border-primary shadow-sm shadow-primary/5";
    const inactiveClass = "text-base-content opacity-70 hover:bg-base-300 hover:opacity-100";

    return `${baseClasses} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <div className="flex h-screen bg-base-200 text-base-content transition-colors duration-500">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 lg:static transition-all duration-300 ease-in-out 
                   w-72 h-full bg-base-100 border-r border-base-300 flex flex-col
                   ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-8 flex items-center justify-center border-b border-base-300">
          <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
             <Logo />
          </NavLink>
        </div>

        <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={getLinkClass}
              onClick={() => setIsSidebarOpen(false)}
              end
            >
              <i className={`${link.icon} w-6 mr-3 text-lg`}></i>
              <span className="uppercase text-[11px] tracking-widest font-black italic">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-base-300">
          <NavLink
            to="/"
            className="flex items-center p-3 rounded-xl font-bold text-error opacity-70 hover:opacity-100 hover:bg-error/10 transition-all uppercase text-[11px] tracking-widest italic"
          >
            <i className="fas fa-arrow-circle-left mr-3"></i> Back to Home
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 z-10 px-6 bg-base-100 border-b border-base-300 flex justify-between items-center transition-colors duration-500 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-xl bg-base-200 text-primary transition-all"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="text-2xl">
              {isSidebarOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
            </div>
          </button>

          <h1 className="text-xs font-black uppercase italic tracking-[0.3em] opacity-40 hidden lg:block">
            Console // <span className="text-primary">{role || "User"}</span>
          </h1>

          {/* User Profile & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle /> {/* Theme Toggling Button added here */}
            
            <div className="h-8 w-[1px] bg-base-300 mx-2"></div>

            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{currentUserName}</p>
                <p className="text-[8px] font-bold text-primary uppercase tracking-widest opacity-60">System Operator</p>
              </div>
              <Link to="/dashboard/my-profile">
                <img
                  src={currentUserImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-2xl object-cover border-2 border-primary/20 group-hover:border-primary transition-all"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-base-200">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ user }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;