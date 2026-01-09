import React from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group transition-transform duration-300 active:scale-95"
    >
      {/* 🎨 Updated Background to Indigo Primary */}
      <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-xl rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-indigo-500/30">
        <FaPaperPlane className="text-white text-xl -rotate-12 group-hover:rotate-0 transition-transform duration-500" />

        {/* 🎨 Updated Notification Dot to Emerald (Accent) */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
        </span>
      </div>

      <div className="flex flex-col leading-tight">
        {/* 🎨 Text colors fixed for Light/Dark mode compatibility */}
        <h1 className="text-2xl font-extrabold tracking-tighter text-indigo-500/90 ">
          Book<span className="text-primary">Courier</span>
        </h1>
        {/* 🎨 More readable secondary text */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-0.5">
          Knowledge Delivered
        </p>
      </div>
    </Link>
  );
};

export default Logo;