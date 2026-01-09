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
const ACCENT_TEXT = "text-primary"; // Indigo-600 from your theme
const ACCENT_BG = "bg-primary";
const ACCENT_HOVER = "hover:bg-primary-dark hover:shadow-indigo-500/30";

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
<section className="py-24 px-4 sm:px-6 lg:px-8 bg-base-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
  <div className="max-w-[1600px] mx-auto">
    
    {/* --- Header Section --- */}
    <div className="text-center mb-16">


     <h2 className="text-4xl md:text-6xl font-extrabold text-primary dark:text-primary tracking-tight">
            Latest <span className="text-primary dark:text-primary">Books</span>
          </h2>
      
      <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
        Automatic synchronization with our partner libraries brings you the 
        most recent literature as soon as it enters the system.
      </p>
    </div>

    {/* --- Responsive Grid Layout --- */}
    {latestBooks.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {latestBooks.slice(0, 10).map((book) => (
          <LatestBookCard key={book._id} book={book} />
        ))}
      </div>
    ) : (
      <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
        <FaBookReader className="mx-auto text-5xl text-slate-300 dark:text-slate-700 mb-4" />
        <p className="text-xl font-bold text-slate-400 dark:text-slate-600">No new entries detected this week.</p>
      </div>
    )}

    {/* --- Footer / Navigation --- */}
    <div className="mt-20 text-center">
      <Link
        to="/all-books"
        className={`group inline-flex items-center px-10 py-4 ${ACCENT_BG} text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:translate-y-[-4px] ${ACCENT_HOVER} shadow-lg shadow-indigo-500/20`}
      >
        Access All Books
        <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
      </Link>
      <p className="mt-6 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        Authorized Users Only • {latestBooks.length} Items Listed
      </p>
    </div>
  </div>
</section>
  );
};

export default LatestBook;