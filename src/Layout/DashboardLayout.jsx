import React, { useState } from 'react';
// FIX: Corrected import to use 'react-router-dom'
import { Link, NavLink, Outlet, useOutletContext } from 'react-router'; // <--- UPDATED IMPORT
import useAuth from '../Hooks/useAuth';
// import Logo from '../Components/Logo/Logo'; // Assuming you have this component

// --- 1. Complete List of All Dashboard Links ---
const allDashboardLinks = [
    // Users
    { name: "My Profile", path: "/dashboard/my-profile", icon: "fas fa-user-circle" },
    { name: "My Orders", path: "/dashboard/my-orders", icon: "fas fa-box-open" },
    { name: "Invoices", path: "/dashboard/invoices", icon: "fas fa-file-invoice-dollar" },
    { name: "My Wishlist", path: "/dashboard/my-wishlist", icon: "fas fa-heart" }, 
    
    // Librarian
    { name: "Add Book", path: "/dashboard/add-book", icon: "fas fa-book-medical" },
    { name: "My Books", path: "/dashboard/my-books", icon: "fas fa-book" },
    { name: "Orders (Librarian)", path: "/dashboard/all-orders", icon: "fas fa-truck-loading" },
    { name: "Manage Books", path: "/dashboard/manage-books", icon: "fas fa-book-reader" },

    // Admin 
    { name: "All Users", path: "/dashboard/all-users", icon: "fas fa-users-cog" },
];

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Get the user object from your custom hook
    const { user } = useAuth(); 
    
    // NOTE: Replace currentUser placeholder with actual user data for the topbar
    const currentUserName = user?.displayName || 'Guest User';
    const currentUserImage = user?.photoURL || 'https://via.placeholder.com/150/ff0077/ffffff?text=User';


    const getLinkClass = ({ isActive }) => {
        const baseClasses = "flex items-center p-3 rounded-lg font-medium transition duration-150 ease-in-out";
        const hoverClass = "hover:bg-gray-100";
        const activeClass = "text-[#ff0077] bg-[rgba(255,0,119,0.1)]"; 
        const inactiveClass = "text-gray-700";

        return `${baseClasses} ${hoverClass} ${isActive ? activeClass : inactiveClass}`;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* 1. Collapsible Sidebar Container */}
            <aside 
                className={`fixed z-40 lg:static transition-transform duration-300 ease-in-out 
                           w-64 h-full bg-white shadow-xl overflow-y-auto
                           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                           lg:translate-x-0`}
            >
                {/* Sidebar Header for Logo/BookCourier (Link to Home) */}
                <NavLink 
                    to="/" 
                    className="sticky top-0 p-6 flex items-center space-x-2 text-2xl font-bold text-[#ff0077] bg-white border-b z-50 hover:bg-gray-50 transition duration-150"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <i className="fas fa-book text-3xl"></i> 
                    <span>BookCourier</span>
                </NavLink>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2">
                    {allDashboardLinks.map(link => (
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
                    <div className="border-t pt-4 mt-4">
                        <NavLink 
                            to="/" 
                            className="flex items-center p-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <i className="fas fa-arrow-circle-left w-5 mr-3"></i> 
                            Back to Main Site
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* 2. Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {/* Topbar for Mobile Sidebar Toggle and User Info */}
                <header className="sticky top-0 z-10 p-4 bg-white shadow-md flex justify-between items-center">
                    {/* HAMBURGER MENU BUTTON */}
                    <button 
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-[#ff0077] mr-auto" 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <i className={`text-xl ${isSidebarOpen ? 'fas fa-times' : 'fas fa-bars'}`}></i> 
                    </button>
                    
                    {/* Title: Only visible on large screens */}
                    <h1 className="text-xl font-semibold text-gray-800 hidden lg:block"> 
                        Dashboard Section
                    </h1>
                    
                    {/* User Profile (Right Side) */}
                    <div className="flex items-center space-x-3 ml-auto lg:ml-0">
                        {/* Use actual user name for display */}
                        <span className="text-sm font-medium text-gray-600 hidden md:inline">{currentUserName}</span>
                        {/* Use actual photo URL */}
                      <Link to='/dashboard/my-profile'>  <img 
                            src={currentUserImage} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full object-cover cursor-pointer border border-[#ff0077]"
                        /></Link>
                    </div>
                </header>

                {/* Dynamic Page Content: PASS THE USER OBJECT HERE */}
                <div className="p-4 md:p-6 lg:p-8">
                    <Outlet context={{ user }} /> 
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;