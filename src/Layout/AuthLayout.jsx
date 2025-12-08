import React from "react";
import Logo from "../Components/Logo/Logo";
import loginImg from "../assets/registerImg.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Logo Area - Fixed at the top center of the screen */}
      <div className="absolute top-0 left-0 p-6 z-10 hidden md:block">
        <Logo />
      </div>

      {/* Main Content Card Container */}
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden mt-16 lg:mt-0">
        <div className="flex flex-row">
          {/* Left Side: Form/Outlet Container */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            {/* Logo area visible on small screens (in case Logo is small) */}
            <div className="block lg:hidden mb-8 text-center">
              <Logo />
            </div>
            <Outlet />
          </div>

          {/* Right Side: Image/Visual Container (Hidden on small screens) */}
          <div className="hidden lg:flex w-1/2 bg-indigo-50 items-center justify-center p-8">
            <div className="text-center">
              <img
                src={loginImg}
                alt="Library login page illustration"
                // Ensure the image scales down nicely
                className="max-h-[500px] w-full object-contain p-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-indigo-700 mt-4">
                Manage Your Books Efficiently
              </h3>
              <p className="text-sm text-indigo-500">
                Register once, read forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
