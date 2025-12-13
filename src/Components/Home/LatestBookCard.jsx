import React from "react";
import { FaBookOpen, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import bookImg from "../../assets/toplibrary1.png";

const LatestBookCard = ({ book }) => {
  const {
    _id,
    bookTitle,
    photo,
    rating,
    isRatingHighlighted,
  } = book;

  const ACCENT_COLOR = "#ff0077"; 
  
  const highlightStyles = isRatingHighlighted
    ? {
        border: `2px solid ${ACCENT_COLOR}`,
        boxShadow: `0 0 20px -5px ${ACCENT_COLOR}66`,
      }
    : {};

  return (
    <div 
      style={highlightStyles}
      className={`group relative bg-base-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-base-300 ${isRatingHighlighted ? 'ring-1 ring-offset-2 ring-pink-500/20' : ''}`}
    >
      {isRatingHighlighted && (
        <div className="absolute top-3 right-3 z-20">
          <span className="badge badge-secondary badge-sm font-bold shadow-md animate-pulse">
            TOP PICK
          </span>
        </div>
      )}

      {/* --- Image Section --- */}
      <div className="h-52 relative overflow-hidden bg-base-200">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
        <img
          src={photo || bookImg}
          alt={bookTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* --- Content Section --- */}
      <div className="p-5 flex flex-col items-center">
        
        {/* Book Title */}
        <h3
          className="text-md font-black text-base-content text-center line-clamp-1 mb-2 group-hover:text-[#ff0077] transition-colors"
          title={bookTitle}
        >
          {bookTitle}
        </h3>

        {/* Rating Display */}
        <div className="flex justify-center items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-xs ${
                i < rating ? "text-yellow-400" : "text-base-content/20" 
              }`}
            />
          ))}
          <span className="ml-2 text-[10px] font-black opacity-40 tracking-widest uppercase">
            {rating}/5
          </span>
        </div>

        {/* Action Button */}
        <Link
          to={`/book/${_id}`}
          className="w-full btn btn-sm border-none text-white transition-all duration-300 gap-2 hover:gap-4"
          style={{ 
            backgroundColor: ACCENT_COLOR,
            boxShadow: isRatingHighlighted ? `0 10px 15px -3px ${ACCENT_COLOR}44` : 'none'
          }}
        >
          <FaBookOpen className="text-xs" />
          <span className="text-[11px] font-bold uppercase tracking-widest">See Details</span>
        </Link>
      </div>

      {/* Subtle Bottom Accent Line */}
      {isRatingHighlighted && (
        <div className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-transparent via-[#ff0077] to-transparent opacity-50" />
      )}
    </div>
  );
};

export default LatestBookCard;