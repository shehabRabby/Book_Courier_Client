import React from "react";
import LatestBookCard from "../../../Components/Home/LatestBookCard";
import { FaBookReader, FaClock, FaArrowRight } from "react-icons/fa"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Logo/Loading/Loading";
// FIX: Using react-router-dom for proper navigation
import { Link } from "react-router-dom"; 

const LatestBook = () => {
  // --- Master Brand Tokens ---
  const ACCENT_TEXT = "text-[#ff0077]";
  const ACCENT_BG = "bg-[#ff0077]";
  const ACCENT_HOVER = "hover:bg-[#ff0071] hover:shadow-pink-500/30";

  const {
    data: latestBooks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/latest-books`
      );
      return result.data;
    },
  });

  // Error Handling UI
  if (isError) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-error">System Sync Failed</h2>
        <p className="opacity-60">Unable to retrieve catalog data from server.</p>
      </div>
    );
  }

  // Loading State
  if (isLoading) return <Loading />;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200 border-t border-base-300">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-base-100 border border-base-300 shadow-sm mb-6`}>
            <FaClock className={`${ACCENT_TEXT} animate-pulse text-xs`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
              Live Catalog Feed
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tight">
            Latest <span className={ACCENT_TEXT}>Acquisitions</span>
          </h2>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-base-content opacity-60 leading-relaxed">
            Automatic synchronization with our partner libraries brings you the 
            most recent literature as soon as it enters the system.
          </p>
        </div>

        {/* --- Responsive Grid Layout --- */}
        {/*  */}
        {latestBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
            {latestBooks.slice(0, 10).map((book) => (
              <LatestBookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
            <FaBookReader className="mx-auto text-5xl opacity-10 mb-4" />
            <p className="text-xl font-bold opacity-30">No new entries detected this week.</p>
          </div>
        )}

        {/* --- Footer / Navigation --- */}
        <div className="mt-16 text-center">
          <Link
            to="/all-books"
            className={`group inline-flex items-center px-10 py-4 ${ACCENT_BG} text-white font-black text-sm uppercase tracking-widest rounded-full transition-all duration-300 transform hover:scale-105 ${ACCENT_HOVER} shadow-xl`}
          >
            Access Full Archive
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
          </Link>
          <p className="mt-4 text-[10px] font-bold opacity-30 uppercase tracking-tighter">
            Authorized Users Only • {latestBooks.length} Items Listed
          </p>
        </div>
      </div>
    </section>
  );
};

export default LatestBook;