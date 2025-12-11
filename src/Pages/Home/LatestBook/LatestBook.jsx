import React from "react";
import LatestBookCard from "../../../Components/Home/LatestBookCard";
import { FaBookReader, FaClock } from "react-icons/fa"; // Import additional icons
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Logo/Loading/Loading";
import { Link } from "react-router";

const LatestBook = () => {
  const { data: LatestBooks =[], isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });


    //loading spinner for data fetch
    if(isError) return <h1>Data fetch error.......</h1>
    if(isLoading) return <Loading></Loading>

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-200">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold tracking-wide text-[#ff0077] uppercase flex items-center justify-center">
          <FaClock className="mr-2 text-base animate-pulse" />
          New Arrivals This Week
        </p>
        <h2 className="mt-2 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
          <span className="inline-flex items-center">
            <FaBookReader className="mr-4 text-[#ff0077] text-4xl md:text-5xl hidden md:block" />
            Explore Our Latest Books
          </span>
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Be the first to discover the newest additions by our library partners.
        </p>
      </div>

      <div className=" grid  gap-8  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5  2xl:grid-cols-5  mx-auto">
        {/* Map over the dummy data to render 8 cards */}
        {LatestBooks.map((book) => (
          <LatestBookCard
            key={book._id}
           book={book}
          />
        ))}
      </div>

      {/* --- Go All Book Section --- */}
      <div className="mt-12 text-center">
        <Link to='/all-books' className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-secondary hover:bg-secondary transition duration-300 transform hover:scale-105">
          See All Books
        </Link>
      </div>
    </section>
  );
};

export default LatestBook;
