import React from "react";
import { FaSearch } from "react-icons/fa";

const accentColor = "#ff0077";

const SearchSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-base-content opacity-80 mb-1">
        Search by Title or Author
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter book title or author name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 
                               bg-base-100 text-base-content 
                               border border-base-300 rounded-lg 
                               placeholder-base-content/50 
                               focus:ring-4 focus:border-transparent transition duration-150"
          style={{ "--tw-ring-color": accentColor }}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50" />
      </div>
    </div>
  );
};

export default SearchSection;
