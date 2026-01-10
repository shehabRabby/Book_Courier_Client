import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import ThemeToggle from "../../../Components/ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logout Successful");
      })
      .catch((error) => {
        console.log("Logout error: ", error.mesage);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-all duration-300 block ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-all duration-300 block ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
            }`
          }
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-all duration-300 block ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-300 block ${
                isActive
                  ? "text-primary font-bold bg-primary/10"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-base-100/80 backdrop-blur-md">
      <div className="navbar max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost lg:hidden text-slate-600 dark:text-slate-300 px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-3 w-64 p-4 shadow-2xl border border-slate-200 dark:border-slate-700 gap-2 overflow-hidden"
            >
              {links}
              {/* Mobile Only: Auth Button */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 lg:hidden">
                {user ? (
                  <button onClick={handleLogOut} className="btn btn-primary btn-sm w-full text-white rounded-lg">Log Out</button>
                ) : (
                  <Link to="/login" className="btn btn-primary btn-sm w-full text-white rounded-lg">Login</Link>
                )}
              </div>
            </ul>
          </div>
          <div className="scale-90 sm:scale-100">
            <Logo />
          </div>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1 px-1">
            {links}
          </ul>
        </div>

        {/* Navbar End: Theme & Auth */}
        <div className="navbar-end gap-2 sm:gap-4">
          <ThemeToggle />

          <div className="hidden lg:block">
            {user ? (
              <button 
                onClick={handleLogOut} 
                className="btn btn-primary btn-md px-6 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Log Out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary btn-md px-6 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;