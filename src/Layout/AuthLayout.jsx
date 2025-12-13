import React from "react";
import Logo from "../Components/Logo/Logo";
import loginImg from "../assets/registerImg.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  const accentColor = "#ff0077";

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="absolute top-0 left-0 p-8 z-20 hidden md:block">
        <Logo />
      </div>

      <div className="w-full max-w-6xl bg-base-100 shadow-2xl rounded-[2rem] overflow-hidden border border-base-300 relative">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          
          <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
            {/* Logo area visible on small screens */}
            <div className="block lg:hidden mb-10 text-center">
              <Logo />
            </div>
            
            <div className="mx-auto w-full max-w-sm">
              <Outlet />
            </div>
          </div>

          <div className="hidden lg:flex w-1/2 relative bg-neutral overflow-hidden items-center justify-center p-12">
            
            <div 
              className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: accentColor }}
            ></div>
            <div 
              className="absolute bottom-[-5%] left-[-5%] w-48 h-48 rounded-full blur-3xl opacity-10 bg-primary"
            ></div>

            <div className="text-center z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 blur-2xl rounded-full scale-90"></div>
                
                <img
                  src={loginImg}
                  alt="Library illustration"
                  className="max-h-[450px] w-full object-contain relative transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-8 space-y-2">
                <h3 className="text-3xl font-black text-neutral-content tracking-tight">
                  Your Digital Library <span style={{ color: accentColor }}>Awaits</span>
                </h3>
                <p className="text-neutral-content/60 font-medium max-w-xs mx-auto">
                  Streamline book management, track inventory, and empower your readers.
                </p>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                <span className="w-8 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
                <span className="w-2 h-1.5 rounded-full bg-neutral-content/20"></span>
                <span className="w-2 h-1.5 rounded-full bg-neutral-content/20"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:hidden text-center opacity-40">
        <p className="text-xs font-bold tracking-widest uppercase">© 2024 LibraryPro System</p>
      </div>
    </div>
  );
};

export default AuthLayout;