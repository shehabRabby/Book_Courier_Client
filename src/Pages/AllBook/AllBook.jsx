import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Logo/Loading/Loading";
import LatestBookCard from "../../Components/Home/LatestBookCard"; // Reusing the card component
import { FaBookOpen, FaLayerGroup } from "react-icons/fa";

const AllBook = () => {
    const { 
        data: allBooks = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ["allBooks"],
        queryFn: async () => {
            // This endpoint now only returns books with status: 'published'
            const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
            return result.data;
        },
    });

    if (isError) return <h1 className="text-center text-red-600 text-3xl pt-20">Error fetching books. Please try again.</h1>;
    if (isLoading) return <Loading />;

    const accentColor = "#ff0077";

    return (
        <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="text-center mb-12">
                <p className="text-sm font-semibold tracking-wide uppercase flex items-center justify-center text-gray-600">
                    <FaLayerGroup className="mr-2 text-base" />
                    The Complete Collection
                </p>
                <h2 className="mt-2 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl">
                    All Published Books
                </h2>
                <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-500">
                    Browse every published title available in the library's catalog.
                </p>
            </div>

            {allBooks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-lg mx-auto max-w-4xl">
                    <FaBookOpen className="mx-auto text-6xl text-gray-400 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700">No Books Found</h3>
                    <p className="text-gray-500 mt-2">There are currently no published books in the database.</p>
                </div>
            ) : (
                <div 
                    // Responsive 5-column grid layout
                    className="grid gap-6 
                               sm:grid-cols-2 
                               md:grid-cols-3 
                               lg:grid-cols-4 
                               xl:grid-cols-5 
                               2xl:grid-cols-5 
                               max-w-7xl mx-auto"
                >
                    {allBooks.map((book) => (
                        // Reusing LatestBookCard as it implements the card layout and link
                        <LatestBookCard
                            key={book._id}
                            book={book}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default AllBook;