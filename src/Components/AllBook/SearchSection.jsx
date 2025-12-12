import React from 'react';
import { FaSearch } from 'react-icons/fa';

// Use a CSS variable for DaisyUI primary/accent color, or keep the static color
const accentColor = "#ff0077"; // This color remains constant for primary actions

// Props: searchTerm and the function to set the search term
const SearchSection = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="md:col-span-2">
            <label 
                // 🎨 CHANGE 1: Label text color uses theme-aware class
                className="block text-sm font-medium text-base-content opacity-80 mb-1"
            >
                Search by Title or Author
            </label>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter book title or author name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // 🎨 CHANGE 2: Input uses theme-aware background, text, border, and placeholder colors
                    className="w-full p-3 pl-10 
                               bg-base-100 text-base-content 
                               border border-base-300 rounded-lg 
                               placeholder-base-content/50 
                               focus:ring-4 focus:border-transparent transition duration-150"
                    // Keep custom ring color for branding
                    style={{ "--tw-ring-color": accentColor }}
                />
                <FaSearch 
                    // 🎨 CHANGE 3: Icon color uses theme-aware text color
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50" 
                />
            </div>
        </div>
    );
};

export default SearchSection;