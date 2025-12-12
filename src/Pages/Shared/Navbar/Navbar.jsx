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
          // Use theme-aware classes for NavLink text
          className={({ isActive }) => 
            isActive 
              ? "text-primary font-bold" 
              : "text-base-content hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/all-books"
          className={({ isActive }) => 
            isActive 
              ? "text-primary font-bold" 
              : "text-base-content hover:text-primary"
          }
        >
          Books
        </NavLink>
      </li>
      {/* ... (Other links using similar NavLink styling) */}
      <li>
        <NavLink 
          to="/request-delivery"
          className={({ isActive }) => 
            isActive 
              ? "text-primary font-bold" 
              : "text-base-content hover:text-primary"
          }
        >
          Request Delivery
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about-us"
          className={({ isActive }) => 
            isActive 
              ? "text-primary font-bold" 
              : "text-base-content hover:text-primary"
          }
        >
          About Us
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink 
              to="/dashboard"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary font-bold" 
                  : "text-base-content hover:text-primary"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  
  return (
    // 🎨 CHANGE 1: Use bg-base-100 for background and text-base-content for default text color
    <div className="navbar shadow-md bg-base-100 text-base-content"> 
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            // 🎨 CHANGE 2: Ensure dropdown background uses theme color
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      
      <div className="navbar-end">
        
    <ThemeToggle></ThemeToggle>

        {user ? (
          <a onClick={handleLogOut} className="btn btn-secondary">
            Log Out
          </a>
        ) : (
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        )}
        <Link to="/rider" className="btn btn-secondary ml-2">
          Rider
        </Link>
      </div>
    </div>
  );
};

export default Navbar;