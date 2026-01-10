import React from "react";
import { FaBookOpen, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import bookImg from "../../assets/toplibrary1.png";

const LatestBookCard = ({ book }) => {
  const { _id, bookTitle, photo, rating, isRatingHighlighted } = book;

  const PRIMARY_COLOR = "#4F46E5"; 
  const HIGHLIGHT_COLOR = "#10B981"; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-base-100 dark:bg-zinc-900 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-zinc-200 dark:border-zinc-800 ${
        isRatingHighlighted ? "ring-2 ring-emerald-500/20" : ""
      }`}
    >
      {isRatingHighlighted && (
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-lg shadow-emerald-500/20 animate-pulse uppercase tracking-[0.15em]">
            Top Pick
          </span>
        </div>
      )}

      <div className="h-56 relative overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <div className="absolute inset-0 bg-zinc-900/5 group-hover:bg-transparent transition-colors z-10" />
        <img
          src={photo || bookImg}
          alt={bookTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3
            className="text-md font-bold text-base-content dark:text-zinc-50 text-left line-clamp-1 group-hover:text-primary transition-colors tracking-tight"
            title={bookTitle}
          >
            {bookTitle}
          </h3>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-[9px] ${
                  i < rating
                    ? "text-primary"
                    : "text-zinc-300 dark:text-zinc-700"
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {rating}.0
            </span>
          </div>
        </div>

        {/* Framer Motion Button */}
        <Link to={`/book/${_id}`} className="w-full">
          <motion.div
            initial="initial"
            whileHover="hover"
            className="relative w-full h-10 bg-primary rounded-xl overflow-hidden flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
          >
            {/* Background Animation Layer */}
            <motion.div
              variants={{
                initial: { x: "-100%" },
                hover: { x: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-indigo-700" // Deeper Indigo for hover
            />

            {/* Button Content */}
            <div className="relative z-10 flex items-center gap-2 text-white">
              <FaBookOpen className="text-[10px]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Details
              </span>
            </div>
          </motion.div>
        </Link>
      </div>

      {isRatingHighlighted && (
        <div className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60" />
      )}
    </motion.div>
  );
};

export default LatestBookCard;