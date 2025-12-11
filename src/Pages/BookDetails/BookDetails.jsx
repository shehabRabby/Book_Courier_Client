import React, { useState } from "react";
import {
    FaShoppingCart, FaBook, FaUserEdit, FaDollarSign, FaStar, 
    FaRulerVertical, FaGlobe, FaCheckCircle, FaInfoCircle, 
    FaTag, FaCalendarAlt,
} from "react-icons/fa";

import useAuth from "../../Hooks/useAuth";
import OrderNowModal from "./OrderNowModal"; 
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Logo/Loading/Loading";



const accentColor = '#ff0077'; 
const DetailFactCard = ({ icon: Icon, title, value, bgColor, borderColor, valueColor, delay }) => (
    <div 
        className={`p-3 sm:p-4 ${bgColor} rounded-xl shadow-lg border-b-4 ${borderColor} 
                    transition duration-300 hover:shadow-xl hover:scale-[1.02] 
                    animate-fadeInUp`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <Icon className={`text-2xl ${valueColor} mx-auto mb-1`} />
        <p className="text-xs text-gray-500 uppercase font-semibold">
            {title}
        </p>
        <p className={`font-bold text-xl ${valueColor} capitalize truncate`} title={value}>
            {value}
        </p>
    </div>
);


const BookDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const { id } = useParams();

    const { data: book = {}, isLoading, isError, refetch,
    } = useQuery({
        queryKey: ["book", id],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
            return result.data;
        },
    });

    const { _id, authorName, bookTitle, category, description, isbn, language, page, photo, price, publicationDate, rating, status,
    } = book;

    // Derived user info
    const currentUser = {
        name: user?.displayName || "Your Name",
        email: user?.email || "name@example.com",
    };

    // book info loading 
    if(isLoading) return <Loading></Loading>
    if(isError) return <h1 className="text-center text-red-600 text-3xl pt-20">Book details not found</h1>

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 animate-fadeInDown">
                Book Overview
            </h1>

            {/* Book Detail Card */}
            <div 
                className="max-w-7xl mx-auto bg-white shadow-3xl rounded-3xl p-6 lg:p-12 
                           border border-gray-100"
                style={{ animationDelay: '100ms' }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Column 1: Book Cover and Call to Action */}
                    <div className="lg:col-span-1 flex flex-col items-center">
                        <img
                            src={photo}
                            alt={bookTitle}
                            className="w-full max-w-xs h-auto rounded-xl shadow-2xl border-4 border-gray-100 
                                       transform transition duration-500 hover:scale-[1.03] hover:shadow-3xl"
                        />
                        <div className="mt-8 w-full max-w-xs">
                            
                            {/* Price Box */}
                            <div className="text-center mb-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
                                <p className="text-sm text-gray-600 font-medium mb-1">
                                    Book Price
                                </p>
                                <p className="text-5xl font-black text-gray-900">
                                    <span className="text-2xl align-top text-gray-600">$</span>{price}
                                </p>
                            </div>

                            {/* Order Button (Using accent color: #ff0077) */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center justify-center py-4 px-6 rounded-xl shadow-xl text-xl font-bold text-white transition-all duration-300 
                                           focus:ring-4 focus:ring-offset-2 focus:ring-opacity-70 transform hover:scale-[1.01] active:scale-[0.99]"
                                style={{ backgroundColor: accentColor, '--tw-ring-color': accentColor }}
                            >
                                <FaShoppingCart className="mr-3" /> Order Now
                            </button>
                            
                            {/* Stock Message */}
                            <div className="text-center mt-4 p-2 bg-yellow-50 rounded-lg text-sm text-yellow-800 font-semibold border-l-4 border-yellow-400 animate-pulse-slow">
                                Limited Stock Available!
                            </div>
                        </div>
                    </div>

                    {/* Column 2 & 3: Details and Description */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* Title & Author Header */}
                        <header className="border-b pb-4 border-gray-100 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-5xl font-black text-gray-900 leading-snug">
                                {bookTitle}
                            </h2>
                            <p className="text-2xl text-gray-600 font-semibold mt-2 flex items-center">
                                <FaUserEdit className="mr-2" style={{ color: accentColor }} /> 
                                <span className="text-gray-700">by</span> {authorName}
                            </p>
                        </header>

                        {/* 4 Key Facts Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <DetailFactCard 
                                icon={FaStar} title="Rating" value={`${rating} / 5`} 
                                bgColor="bg-blue-50" borderColor="border-blue-500" valueColor="text-blue-800" delay={300}
                            />
                            <DetailFactCard 
                                icon={FaCheckCircle} title="Status" value={status} 
                                bgColor="bg-green-50" borderColor="border-green-500" valueColor="text-green-800" delay={350}
                            />
                            <DetailFactCard 
                                icon={FaTag} title="Genre" value={category} 
                                bgColor="bg-purple-50" borderColor="border-purple-500" valueColor="text-purple-800" delay={400}
                            />
                             <DetailFactCard 
                                icon={FaRulerVertical} title="Pages" value={page} 
                                bgColor="bg-orange-50" borderColor="border-orange-500" valueColor="text-orange-800" delay={450}
                            />
                        </div>

                        {/* Book Description / Synopsis */}
                        <div className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                            <h3 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-4 border-gray-100 flex items-center">
                                <FaInfoCircle className="mr-2 text-gray-500" /> Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-100">
                                {description}
                            </p>
                        </div>

                        {/* Additional Metadata Panel (Publication Details) */}
                        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaBook className="mr-2" style={{ color: accentColor }} /> Key Publication Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                                <p className="flex items-center font-medium p-3 bg-red-50 rounded-lg shadow-sm">
                                    <FaCalendarAlt className="mr-3 text-red-600" /> 
                                    <span className="font-semibold text-gray-700">Published:</span> {publicationDate}
                                </p>
                                
                                <p className="flex items-center font-medium p-3 bg-gray-50 rounded-lg shadow-sm">
                                    <FaBook className="mr-3 text-blue-500" /> 
                                    <span className="font-semibold text-gray-700">ISBN:</span> {isbn}
                                </p>
                                <p className="flex items-center font-medium p-3 bg-gray-50 rounded-lg shadow-sm">
                                    <FaGlobe className="mr-3 text-green-500" /> 
                                    <span className="font-semibold text-gray-700">Language:</span> {language}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- Order Modal--- */}
            <OrderNowModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentUser={currentUser}
                bookPrice={price}
            />

            {/* Global Animation Styles */}
            <style jsx global>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInDown {
                    animation: fadeInDown 0.3s ease-out;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out both; /* Added 'both' to keep the final state */
                }
                /* Staggered Animations */
                .animate-fadeInUp[style*="animation-delay"] {
                    opacity: 0; /* Hide elements initially for staggered effect */
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s infinite;
                }
            `}</style>
        </div>
    );
};

export default BookDetails;