import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Logo/Loading/Loading";
import {
  FaBookOpen,
  FaLayerGroup,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import SearchSection from "../../Components/AllBook/SearchSection";
import FilteringByRating from "../../Components/AllBook/FilteringByRating";
import LatestBookCard from "../../Components/Home/LatestBookCard";
import useDebounce from "../../Hooks/useDebounce";
import AllBookAnimation from "../../Components/AllBook/AllBookAnimation";

const AllBook = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: bookData = { result: [], count: 0 },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "allBooks",
      currentPage,
      itemsPerPage,
      debouncedSearchTerm,
      filterCategory,
      filterRating,
    ],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
        params: {
          page: currentPage,
          size: itemsPerPage,
          search: debouncedSearchTerm,
          category: filterCategory,
          rating: filterRating,
        },
      });
      return res.data;
    },
  });

  const books = bookData.result;
  const totalCount = bookData.count;
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm, filterCategory, filterRating, itemsPerPage]);

  const handleReset = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterRating(0);
    setCurrentPage(0);
  };
  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <h1 className="text-center text-red-500 pt-20">Error fetching books.</h1>
    );

  return (
    <div className="min-h-screen bg-base-200">
      <AllBookAnimation></AllBookAnimation>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wide uppercase flex items-center justify-center text-base-content opacity-70">
            <FaLayerGroup className="mr-2 text-base" />
            The Complete Collection
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-base-content sm:text-5xl">
            All Published Books
          </h2>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-10 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-base-content mb-4 flex items-center">
            <FaFilter className="mr-2 text-[#DE2A8A]" /> Filter & Search
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SearchSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <FilteringByRating
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterRating={filterRating}
              setFilterRating={setFilterRating}
              handleReset={handleReset}
            />
          </div>
        </div>

        {/* Book Grid */}
        {books.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-xl shadow-lg mx-auto max-w-4xl text-base-content">
            <FaBookOpen className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold">No Results Found</h3>
          </div>
        ) : (
          <>
            <div className="grid gap-6 max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => (
                <LatestBookCard key={book._id} book={book} />
              ))}
            </div>

            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="join bg-base-100 shadow-md">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="join-item btn btn-outline border-base-300"
                >
                  <FaChevronLeft />
                </button>

                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn border-base-300 ${
                      currentPage === page
                        ? "bg-[#DE2A8A] text-white border-[#DE2A8A] hover:bg-[#DE2A8A]"
                        : "btn-outline"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === numberOfPages - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="join-item btn btn-outline border-base-300"
                >
                  <FaChevronRight />
                </button>
              </div>
              <div className="text-center gap-2">
                <span className="text-sm opacity-70">Books per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="select select-bordered select-sm rounded-lg"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AllBook;
