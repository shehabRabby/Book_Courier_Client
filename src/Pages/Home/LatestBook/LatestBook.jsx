import React from 'react';
import LatestBookCard from '../../../Components/Home/LatestBookCard';
import { FaBookReader, FaClock } from 'react-icons/fa'; // Import additional icons

// Dummy data for 8 cards (Data remains the same)
const dummyLatestBooks = [
    { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', category: 'Thriller' },
    { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', category: 'Sci-Fi' },
    { id: 3, title: 'Where the Crawdads Sing', author: 'Delia Owens', category: 'Fiction' },
    { id: 4, title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help' },
    { id: 5, title: 'Educated', author: 'Tara Westover', category: 'Memoir' },
    { id: 6, title: 'The Midnight Library', author: 'Matt Haig', category: 'Fantasy' },
    { id: 7, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History' },
    { id: 8, title: 'The Vanishing Half', author: 'Brit Bennett', category: 'Historical Fiction' },
];

const LatestBook = () => {
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
                {dummyLatestBooks.map(book => (
                    <LatestBookCard 
                        key={book.id} 
                        title={book.title} 
                        author={book.author}
                        category={book.category}
                    />
                ))}
            </div>
            
            {/* --- Go All Book Section --- */}
            <div className="mt-12 text-center">
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-secondary hover:bg-secondary transition duration-300 transform hover:scale-105">
                    See All Books
                </button>
            </div>
         

        </section>
    );
};

export default LatestBook;