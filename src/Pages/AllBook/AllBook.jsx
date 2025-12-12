import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Logo/Loading/Loading";
import LatestBookCard from "../../Components/Home/LatestBookCard";
import { FaBookOpen, FaLayerGroup, FaFilter } from "react-icons/fa";
import AllBookAnimation from "../../Components/AllBook/AllBookAnimation";
import SearchSection from "../../Components/AllBook/SearchSection";
import FilteringByRating from "../../Components/AllBook/FilteringByRating";

const AllBook = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterRating, setFilterRating] = useState(0);

    const {
        data: allBooks = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["allBooks"],
        queryFn: async () => {
            try {
                const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
                return result.data;
            } catch (error) {
                console.error("Failed to fetch books:", error);
                throw new Error("Could not fetch book data from the server.");
            }
        },
    });

    const handleReset = () => {
        setSearchTerm("");
        setFilterCategory("");
        setFilterRating(0);
    };

    const filteredBooks = useMemo(() => {
        return allBooks.filter((book) => {
            // 1. Search Filter (Title or Author)
            const searchMatch =
                !searchTerm ||
                (book.bookTitle &&
                    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (book.authorName &&
                    book.authorName.toLowerCase().includes(searchTerm.toLowerCase()));
            
            // 2. Category Filter
            const categoryMatch =
                !filterCategory ||
                (book.category &&
                    book.category.toLowerCase() === filterCategory.toLowerCase());
            
            // 3. Rating Filter
            const ratingMatch =
                !filterRating || (book.rating && book.rating >= filterRating);

            return searchMatch && categoryMatch && ratingMatch;
        });
    }, [allBooks, searchTerm, filterCategory, filterRating]);

    if (isError)
        return (
            // Use DaisyUI text class for error message
            <h1 className="text-center text-red-500 text-3xl pt-20 text-base-content">
                Error fetching books. Please try again.
            </h1>
        );
    if (isLoading) return <Loading />;

    return (
        // 🎨 CHANGE 1: Outer container uses theme-aware background color
        <div className="min-h-screen bg-base-200">
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    {" "}
                    <p 
                        // 🎨 CHANGE 2: Text color changes with theme
                        className="text-sm font-semibold tracking-wide uppercase flex items-center justify-center text-base-content opacity-70"
                    >
                        <FaLayerGroup className="mr-2 text-base" />
                        The Complete Collection{" "}
                    </p>{" "}
                    <h2 
                        // 🎨 CHANGE 3: Header text color changes with theme
                        className="mt-2 text-4xl leading-10 font-extrabold text-base-content sm:text-5xl"
                    >
                        All Published Books{" "}
                    </h2>{" "}
                </div>
                
                {/* 2. Search and Filtering Container */}
                <div 
                    // 🎨 CHANGE 4: Inner card uses theme-aware primary background
                    className="bg-base-100 p-6 rounded-xl shadow-lg mb-10 max-w-7xl mx-auto"
                >
                    {" "}
                    <h3 
                        // 🎨 CHANGE 5: Filter title text color changes with theme
                        className="text-2xl font-bold text-base-content mb-4 flex items-center"
                    >
                        {" "}
                        <FaFilter className="mr-2" style={{ color: "#DE2A8A" }} /> Filter &
                        Search Tools{" "}
                    </h3>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Search Bar Component - Ensure SearchSection uses theme-aware inputs */}
                        <SearchSection
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                        {/* Filtering Components - Ensure FilteringByRating uses theme-aware selects/text */}
                        <FilteringByRating
                            filterCategory={filterCategory}
                            setFilterCategory={setFilterCategory}
                            filterRating={filterRating}
                            setFilterRating={setFilterRating}
                            handleReset={handleReset}
                        />{" "}
                    </div>{" "}
                </div>
                
                {/* 3. Book Grid Display */}
                {filteredBooks.length === 0 ? (
                    <div 
                        // 🎨 CHANGE 6: No results card uses theme-aware primary background
                        className="text-center py-20 bg-base-100 rounded-xl shadow-lg mx-auto max-w-4xl text-base-content"
                    >
                        {" "}
                        <FaBookOpen className="mx-auto text-6xl text-gray-400 mb-4" />{" "}
                        <h3 className="text-2xl font-semibold">
                            No Results Found{" "}
                        </h3>{" "}
                        <p className="text-base-content opacity-70 mt-2">
                            Try adjusting your search query or filters.
                        </p>{" "}
                    </div>
                ) : (
                    <div
                        className="grid gap-6 max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5"
                    >
                        {" "}
                        {filteredBooks.map((book) => (
                            // Ensure LatestBookCard component uses theme-aware classes internally
                            <LatestBookCard key={book._id} book={book} />
                        ))}{" "}
                    </div>
                )}{" "}
            </section>{" "}
        </div>
    );
};

export default AllBook;