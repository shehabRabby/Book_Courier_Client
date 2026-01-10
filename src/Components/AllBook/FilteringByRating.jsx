import React from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

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
      <div className="flex-1">
        <label className="block text-[10px] font-black uppercase tracking-widest text-base-content-muted mb-2 ml-1">
          Category
        </label>
        <div className="relative group">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-3.5 
                        bg-base-200 border-none rounded-xl
                        text-sm font-semibold text-base-content 
                        appearance-none pr-10 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-base-content opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />
        </div>
      </div>

      {/* Filter by Rating */}
      <div className="flex-1">
        <label className="block text-[10px] font-black uppercase tracking-widest text-base-content-muted mb-2 ml-1">
          Minimum Rating
        </label>
        <div className="relative group">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="w-full p-3.5 
                        bg-base-200 border-none rounded-xl
                        text-sm font-semibold text-base-content 
                        appearance-none pr-10 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value={0}>Any Rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}.0 Stars & Up
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-base-content opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex items-end pt-2 md:pt-0">
        <button
          onClick={handleReset}
          className="btn bg-primary px-8 rounded-xl font-bold border-none text-white
                      
                     hover:bg-[#3f3fcc] hover:shadow-primary/40 
                     active:bg-[#3737b3]
                     transition-all duration-300 normal-case"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default FilteringByRating;
