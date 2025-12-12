import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 group transition-transform duration-300 active:scale-95"
    >
      {/* Icon Component: Represents the "Courier" aspect */}
      <div className="relative flex items-center justify-center w-10 h-10 bg-[#ff0077] rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-pink-500/20">
        <FaPaperPlane className="text-white text-xl -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        
        {/* Decorative Signal Pulse */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      </div>

      {/* Brand Name: Technical & Bold Styling */}
      <div className="flex flex-col leading-none">
        <h1 className="text-2xl font-black tracking-tighter text-base-content">
          Book<span className="text-[#ff0077]">Courier</span>
        </h1>
        <p className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-40 ml-0.5">
          Knowledge Delivered
        </p>
      </div>
    </Link>
  );
};

export default Logo;