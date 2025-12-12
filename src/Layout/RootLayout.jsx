import React from "react";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";

const RootLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top automatically when the route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-md border-b border-base-300">
        <div className="max-w-7xl mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex-grow w-full max-w-7xl mx-auto py-8">
        <div
          key={pathname}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <Outlet />
        </div>
      </main>

      <footer className="bg-base-200 border-t border-base-300">
        <div className="max-w-7xl mx-auto">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
