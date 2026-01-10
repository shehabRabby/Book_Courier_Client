import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-[10px] font-black uppercase tracking-widest text-base-content-muted mb-2 ml-1">
        Search Library
      </label>
      <div className="relative group">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 
                     bg-base-200 text-base-content 
                     border-none rounded-2xl
                     placeholder-base-content/40 
                     focus:ring-2 focus:ring-primary/20 transition-all 
                     font-medium text-sm"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content opacity-30 group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
      </div>
    </div>
  );
};

export default SearchSection;