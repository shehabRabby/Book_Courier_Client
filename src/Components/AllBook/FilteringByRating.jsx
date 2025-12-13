import React from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

const accentColor = "#ff0077"; 

const categories = [
  "fiction",
  "nonfiction",
  "children",
  "mystery",
  "Science Fiction",
  "Thriller",
  "Biography",
  "History",
];

const FilteringByRating = ({
  filterCategory,
  setFilterCategory,
  filterRating,
  setFilterRating,
  handleReset,
}) => {
  return (
    <>
      {/* Filter by Category */}
      <div>
        <label 
            className="block text-sm font-medium text-base-content opacity-80 mb-1"
        >
          Filter by Category
        </label>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-3 
                        border border-base-300 rounded-lg 
                        bg-base-100 text-base-content 
                        appearance-none pr-8 focus:ring-4 focus:border-transparent transition duration-150"
            style={{ "--tw-ring-color": accentColor }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <FaChevronDown 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50 pointer-events-none" 
            />
        </div>
      </div>
      <div>
        <label 
            className="block text-sm font-medium text-base-content opacity-80 mb-1"
        >
          Minimum Rating
        </label>
        <div className="relative">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="w-full p-3 
                        border border-base-300 rounded-lg 
                        bg-base-100 text-base-content 
                        appearance-none pr-8 focus:ring-4 focus:border-transparent transition duration-150"
            style={{ "--tw-ring-color": accentColor }}
          >
            <option value={0}>Any Rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}.0
              </option>
            ))}
          </select>
          <FaChevronDown 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50 pointer-events-none" 
            />
        </div>
      </div>

      <div className="flex items-end pt-2 md:pt-0">
        <button
          onClick={handleReset}
          className="w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200"
          style={{ backgroundColor: accentColor }}
        >
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default FilteringByRating;