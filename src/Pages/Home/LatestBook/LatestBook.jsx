import React from "react";
import LatestBookCard from "../../../Components/Home/LatestBookCard";
import { FaBookReader, FaClock } from "react-icons/fa"; // Import additional icons
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Logo/Loading/Loading";
// FIX: Corrected import from "react-router" to "react-router-dom"
import { Link } from "react-router"; 

const LatestBook = () => {
  // --- Custom Accent Color Mapping for theme toggling ---
  const ACCENT_COLOR_CLASS = "text-pink-600 dark:text-pink-400";
  const ACCENT_BG_OPAQUE = "bg-pink-600";
  const ACCENT_HOVER_BTN =
    "hover:bg-pink-700 hover:shadow-xl focus:ring-pink-500";


  const {
    data: LatestBooks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/latest-books`
      );
      return result.data;
    },
  });

  //loading spinner for data fetch
  if (isError) return <h1>Data fetch error.......</h1>;
  if (isLoading) return <Loading></Loading>;

  return (
    // Theme-aware background and border classes
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200 border-t border-b border-base-300">
      <div className="text-center mb-12">
        
        {/* Theme-aware accent color */}
        <p className={`text-sm font-semibold tracking-wide uppercase flex items-center justify-center ${ACCENT_COLOR_CLASS}`}>
          <FaClock className="mr-2 text-base animate-pulse" />
          New Arrivals This Week
        </p>
        
        {/* Theme-aware text color */}
        <h2 className="mt-2 text-4xl leading-10 font-extrabold text-base-content sm:text-5xl sm:leading-none md:text-6xl">
          <span className="inline-flex items-center">
            
            {/* Theme-aware accent color */}
            <FaBookReader className={`mr-4 ${ACCENT_COLOR_CLASS} text-4xl md:text-5xl hidden md:block`} />
            Explore Our Latest Books
          </span>
        </h2>
        
        {/* Theme-aware paragraph color */}
        <p className="mt-3 max-w-2xl mx-auto text-xl text-base-content opacity-70 sm:mt-4">
          Be the first to discover the newest additions by our library partners.
        </p>
      </div>

      <div className=" grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 mx-auto">
        {/* Map over the dummy data to render 8 cards */}
        {LatestBooks.map((book) => (
          <LatestBookCard key={book._id} book={book} />
        ))}
      </div>

      {/* --- Go All Book Section (Theme-aware button) --- */}
      <div className="mt-12 text-center">
        <Link
          to="/all-books"
          // REMOVED the problematic comment line from inside the Link component
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white ${ACCENT_BG_OPAQUE} ${ACCENT_HOVER_BTN} transition duration-300 transform hover:scale-105`}
        >
          See All Books
        </Link>
      </div>
    </section>
  );
};

export default LatestBook;