import React from "react";
import { FaBookOpen, FaStar } from "react-icons/fa"; // Added FaStar for potential rating display
import { Link } from "react-router-dom"; // Changed Link import to react-router-dom for standard usage
import bookImg from "../../assets/toplibrary1.png"; // Assuming you might still use this placeholder

const LatestBookCard = ({ book }) => {
  const {
    _id,
    authorName,
    bookTitle,
    category,
    photo,
    rating,
    isRatingHighlighted,
  } = book;

  const highlightClasses = isRatingHighlighted
    ? "border-4 border-dashed border-[#ff0077] ring-4 ring-[#ff0077]/30 shadow-2xl"
    : "border border-gray-100";
  const cardClasses = `
        bg-white rounded-xl shadow-lg overflow-hidden 
        transform transition duration-300 
        hover:shadow-2xl hover:scale-[1.03]
        ${highlightClasses}
    `;

  return (
    <div className={cardClasses}>
      <div className="h-44 flex items-center justify-center bg-indigo-100">
        <img
          src={photo || bookImg}
          alt={bookTitle}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3
          className="text-lg font-semibold text-gray-900 truncate"
          title={bookTitle}
        >
          {bookTitle}
        </h3>
        <p className="text-sm text-gray-600 mt-1 mb-2 truncate">{authorName}</p>
        {/* Rating Display (Optional but helpful for context) */}
        <div className="flex justify-center items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-medium text-gray-600">
            ({rating})
          </span>
        </div>
        <span className="inline-block bg-indigo-200 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
          {category}
        </span>
        <Link
          to={`/book/${_id}`}
          onClick={() => console.log(`Viewing details for: ${bookTitle}`)}
          className="w-full flex items-center justify-center bg-[#ff0077] hover:bg-[#d60065] text-white font-medium py-1 px-2 rounded-lg transition duration-200 shadow-md"
        >
          <FaBookOpen className="mr-2" />
          See Details
        </Link>
      </div>
    </div>
  );
};

export default LatestBookCard;
