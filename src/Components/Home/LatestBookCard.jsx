import React from "react";
import { FaBookOpen } from "react-icons/fa";
import bookImg from "../../assets/toplibrary1.png";
import { Link } from "react-router";

const LatestBookCard = ({ title, author, category }) => {
  // Placeholder image URL

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-[1.03] border border-gray-100">
      {/* Image Placeholder */}
      <div className="h-44 flex items-center justify-center bg-indigo-100">
        <img src={bookImg} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 text-center">
        {/* Title */}
        <h3
          className="text-lg font-semibold text-gray-900 truncate"
          title={title}
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 mt-1 mb-2 truncate">{author}</p>

        {/* Category Badge */}
        <span className="inline-block bg-indigo-200 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
          {category}
        </span>

        {/* See Details Button */}
        <Link
          to={`/book/1`}
          onClick={() => console.log(`Viewing details for: ${title}`)}
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
