import React, { useState } from "react";
import {
    FaShoppingCart,
    FaBook,
    FaUserEdit,
    FaDollarSign,
    FaStar,
    FaRulerVertical,
    FaGlobe,
    FaCheckCircle,
    FaInfoCircle,
    FaTag,
} from "react-icons/fa";
// The image import needs to be adjusted based on the actual path:
import bookImg from "../../assets/toplibrary1.png";
import useAuth from "../../Hooks/useAuth";
import OrderNowModal from './OrderNowModal'; // Import the new modal component

// --- Dummy Book Data ---
const dummyBook = {
    name: "The Secret Garden",
    image: bookImg,
    author: "Frances Hodgson Burnett",
    status: "published",
    price: 15.99,
    rating: 4.5,
    pages: 440,
    language: "English",
    isbn: "978-0143105747",
    genre: "Classic Children's Literature",
    description:
        "A classic children's novel about the solitary orphan Mary Lennox who is sent to live in her uncle's imposing manor on the Yorkshire moors, where she discovers a secret, neglected garden and begins to heal herself and her family.",
};

const BookDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    
    // Derived user info
    const currentUser = {
        name: user?.displayName || "John Doe",
        email: user?.email || "john.doe@example.com",
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-10">
                Book Details
            </h1>

            {/* --- Main Book Detail Card --- */}
            <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-6 lg:p-12 animate-fadeInUp">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Column 1: Book Cover and Order Button */}
                    <div className="lg:col-span-1 flex flex-col items-center">
                        <img
                            // Using dummyBook.image for a complete setup, replace with bookImg if preferred
                            src={dummyBook.image} 
                            alt={dummyBook.name}
                            className="w-full max-w-xs h-auto rounded-xl shadow-xl border-4 border-[#ff0077]/50 transform transition duration-500 hover:scale-[1.03] hover:shadow-3xl"
                        />
                        <div className="mt-8 w-full max-w-xs">
                            <div className="text-center mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                <p className="text-sm text-indigo-700 font-medium animate-pulse-slow">
                                    Limited Stock Available!
                                </p>
                            </div>
                            <p className="text-4xl font-extrabold text-[#ff0077] text-center mb-4">
                                ${dummyBook.price.toFixed(2)}
                            </p>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500/50 transform hover:scale-[1.01]"
                            >
                                <FaShoppingCart className="mr-2" /> Order Now
                            </button>
                        </div>
                    </div>

                    {/* Column 2 & 3: Details and Description */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Title and Author Header */}
                        <header className="border-b pb-4 border-gray-200">
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                                {dummyBook.name}
                            </h2>
                            <p className="text-xl text-indigo-600 font-medium mt-1 flex items-center">
                                <FaUserEdit className="mr-2 text-[#ff0077]" /> Author: {dummyBook.author}
                            </p>
                        </header>

                        {/* Key Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            
                            {/* Price */}
                            <div className="p-3 bg-yellow-50 rounded-lg shadow-md border-b-4 border-yellow-500">
                                <FaDollarSign className="text-2xl text-yellow-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-500 uppercase font-semibold">Price</p>
                                <p className="font-bold text-xl text-yellow-800">${dummyBook.price.toFixed(2)}</p>
                            </div>

                            {/* Status */}
                            <div className="p-3 bg-green-50 rounded-lg shadow-md border-b-4 border-green-500">
                                <FaCheckCircle className="text-2xl text-green-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
                                <p className="font-bold text-xl text-green-800 capitalize">{dummyBook.status}</p>
                            </div>
                            
                            {/* Genre */}
                            <div className="p-3 bg-purple-50 rounded-lg shadow-md border-b-4 border-purple-500">
                                <FaTag className="text-2xl text-purple-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-500 uppercase font-semibold">Genre</p>
                                <p className="font-bold text-xl text-purple-800 capitalize truncate">{dummyBook.genre}</p>
                            </div>

                            {/* Rating */}
                            <div className="p-3 bg-blue-50 rounded-lg shadow-md border-b-4 border-blue-500">
                                <FaStar className="text-2xl text-blue-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-500 uppercase font-semibold">Rating</p>
                                <p className="font-bold text-xl text-blue-800">
                                    {dummyBook.rating} / 5
                                </p>
                            </div>
                        </div>

                        {/* Book Description */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-3 border-gray-200 flex items-center">
                                <FaInfoCircle className="mr-2 text-indigo-600" /> Synopsis
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {dummyBook.description}
                            </p>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 gap-4 text-gray-600 text-base border-t pt-4 border-gray-100">
                            <p className="flex items-center font-medium"><FaRulerVertical className="mr-2 text-indigo-500" /> Pages: {dummyBook.pages}</p>
                            <p className="flex items-center font-medium"><FaGlobe className="mr-2 text-indigo-500" /> Language: {dummyBook.language}</p>
                            <p className="flex items-center font-medium"><FaBook className="mr-2 text-indigo-500" /> ISBN: {dummyBook.isbn}</p>
                        </div>

                    </div>
                </div>
            </div>
            {/* --- End Main Card --- */}

            {/* --- External Order Modal Component --- */}
            <OrderNowModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentUser={currentUser}
                bookPrice={dummyBook.price}
            />

            {/* Optional: Add basic keyframe CSS for the animation */}
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
                    animation: fadeInUp 0.5s ease-out;
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