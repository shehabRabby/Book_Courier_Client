import React from "react";
import { FaBookOpen, FaStar } from "react-icons/fa"; // Added FaStar for potential rating display
import { Link } from "react-router-dom"; 
import bookImg from "../../assets/toplibrary1.png"; // Assuming you might still use this placeholder

const LatestBookCard = ({ book }) => {
  const {
    _id,
    bookTitle,
    photo,
    rating,
    isRatingHighlighted,
  } = book;

  // --- Custom Accent Color Mapping for theme toggling (Pink/Primary Color) ---
  const ACCENT_CLASS = "text-pink-600 dark:text-pink-400";
  const ACCENT_BG_CLASS = "bg-pink-600 hover:bg-pink-700";
  const HIGHLIGHT_RING = "ring-pink-500/30";
  
  const highlightClasses = isRatingHighlighted
    // Using theme-aware border and ring classes for highlight
    ? `border-4 border-dashed ${ACCENT_CLASS.replace('text-', 'border-')} ring-4 ${HIGHLIGHT_RING} shadow-2xl` 
    // Using theme-aware base border color
    : "border border-base-300"; 
  
  const cardClasses = `
        // Use bg-base-100 for theme compatibility
        bg-base-100 rounded-xl shadow-lg overflow-hidden 
        transform transition duration-300 
        hover:shadow-2xl hover:scale-[1.03]
        ${highlightClasses}
    `;

  return (
    <div className={cardClasses}>
      {/* Book Image Section */}
      {/* Use bg-base-200 for a subtle theme-aware background */}
      <div className="h-44 flex items-center justify-center bg-base-200">
        <img
          src={photo || bookImg}
          alt={bookTitle}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 text-center">
        {/* 1. Book Title (Retained) */}
        {/* Use theme-aware text-base-content */}
        <h3
          className="text-lg font-bold text-base-content truncate mb-3"
          title={bookTitle}
        >
          {bookTitle}
        </h3>

        {/* 2. Rating Display (Retained) */}
        <div className="flex justify-center items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              // Use theme-aware gray color for unrated stars (text-base-content/50)
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400" : "text-base-content opacity-30" 
              }`}
            />
          ))}
          {/* Use theme-aware text-base-content for the rating number */}
          <span className="ml-1 text-sm font-medium text-base-content opacity-80">
            ({rating})
          </span>
        </div>

        {/* NOTE: Author Name and Category removed as requested */}
        
        {/* 3. See Details Button (Retained) */}
        {/* Use accent classes for button color matching */}
        <Link
          to={`/book/${_id}`}
          onClick={() => console.log(`Viewing details for: ${bookTitle}`)}
          className={`w-full flex items-center justify-center ${ACCENT_BG_CLASS} text-white font-medium py-2 px-2 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.02]`}
        >
          <FaBookOpen className="mr-2" />
          See Details
        </Link>
      </div>
    </div>
  );
};

export default LatestBookCard;