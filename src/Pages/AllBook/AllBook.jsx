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

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-center text-error font-bold">Error fetching books. Please try again.</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200">
      <AllBookAnimation />
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-primary/30"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              The Complete Collection
            </p>
            <span className="h-px w-8 bg-primary/30"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
            Library Archive
          </h2>
        </div>

        {/* Filter Card */}
        <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm mb-12">
          <div className="flex items-center gap-3 mb-6 border-b border-base-200 pb-4">
            <FaFilter className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest text-base-content">
              Feltering Controls
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <div className="text-center py-24 bg-base-100 rounded-[2.5rem] shadow-sm max-w-4xl mx-auto border-none">
            <FaBookOpen className="mx-auto text-6xl text-base-300 mb-6" />
            <h3 className="text-2xl font-bold text-base-content/50">No Results Found</h3>
            <p className="text-base-content-muted mt-2">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => (
                <div key={book._id} className="hover:-translate-y-2 transition-transform duration-300">
                   <LatestBookCard book={book} />
                </div>
              ))}
            </div>

            {/* Pagination & Settings */}
            <div className="mt-20 flex flex-col items-center gap-6">
              <div className="join bg-base-100 shadow-sm border border-base-200 rounded-2xl overflow-hidden">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="join-item btn btn-ghost px-6 text-base-content hover:bg-primary hover:text-white disabled:opacity-30"
                >
                  <FaChevronLeft />
                </button>

                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn border-none px-6 font-bold ${
                      currentPage === page
                        ? "bg-primary text-white hover:bg-primary shadow-lg shadow-primary/20"
                        : "btn-ghost text-base-content/60"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === numberOfPages - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="join-item btn btn-ghost px-6 text-base-content hover:bg-primary hover:text-white disabled:opacity-30"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="flex items-center gap-3 bg-base-100 p-2 px-4 rounded-full shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-base-content-muted">/Page</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="select select-ghost select-sm font-bold text-primary focus:bg-transparent"
                >
                  <option value={5}>05</option>
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