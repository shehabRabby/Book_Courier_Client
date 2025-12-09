import React from 'react';
import { motion } from 'framer-motion';
import {
    FaBookMedical,
    FaBook,
    FaUserEdit,
    FaDollarSign,
    FaCalendarAlt,
    FaRulerVertical,
    FaGlobe,
    FaTag,
    FaImage,
    FaInfoCircle,
    FaStar,
    FaCloudUploadAlt,
    FaCheckCircle, // New icon for Status field
} from 'react-icons/fa';

// Framer Motion Variants for a gentle staggered appearance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
};

const AddBook = () => {
    // Placeholder function for form submission (replace with your actual handler)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    // Tailwind Color Customization: Using #ff0077 for accents
    const accentColor = '#ff0077'; 

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.header
                    className="mb-10 text-center"
                    variants={itemVariants}
                >
                    <h1 className="text-5xl font-extrabold text-gray-900 flex items-center justify-center">
                        {/* ICON COLOR: ff0077 */}
                        <FaBookMedical className="mr-3" style={{ color: accentColor }} />
                        Add New Book to Library
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Fill out the details below to catalog a new entry.
                    </p>
                </motion.header>

                {/* Main Form Container */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-100"
                    variants={containerVariants}
                >
                    {/* --- Grid Layout: Two Columns on Large Screens --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* === Column 1: Core Details (Left) === */}
                        <div className="space-y-6">
                            
                            {/* Book Title */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaBook className="mr-2" style={{ color: accentColor }} /> Book Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="The Secret Garden"
                                    // FOCUS RING COLOR: ff0077
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                    style={{ '--tw-ring-color': accentColor }} 
                                />
                            </motion.div>

                            {/* Author Name */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaUserEdit className="mr-2" style={{ color: accentColor }} /> Author Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Frances Hodgson Burnett"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                    style={{ '--tw-ring-color': accentColor }} 
                                />
                            </motion.div>

                            {/* Category/Genre */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaTag className="mr-2" style={{ color: accentColor }} /> Category/Genre
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-4 focus:border-transparent transition duration-150"
                                    style={{ '--tw-ring-color': accentColor }} 
                                >
                                    <option value="">Select Genre</option>
                                    <option value="fiction">Fiction</option>
                                    <option value="nonfiction">Non-Fiction</option>
                                    <option value="children">Children's Literature</option>
                                    <option value="mystery">Mystery</option>
                                </select>
                            </motion.div>
                            
                            {/* NEW FIELD: Status */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaCheckCircle className="mr-2" style={{ color: accentColor }} /> Status
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-4 focus:border-transparent transition duration-150"
                                    style={{ '--tw-ring-color': accentColor }} 
                                >
                                    <option value="published">Published</option>
                                    <option value="unpublished">Unpublished</option>
                                </select>
                            </motion.div>
                            
                            {/* Book Image Upload */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaImage className="mr-2" style={{ color: accentColor }} /> Book Cover Image
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-md w-full bg-white transition duration-150"
                                />
                            </motion.div>
                            
                        </div>

                        {/* === Column 2: Additional Details (Right) === */}
                        <div className="space-y-6">
                            
                            {/* Price and Pages (Inline Grid) */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div variants={itemVariants}>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                        <FaDollarSign className="mr-2" style={{ color: accentColor }} /> Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="15.99"
                                        step="0.01"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                        style={{ '--tw-ring-color': accentColor }} 
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                        <FaRulerVertical className="mr-2" style={{ color: accentColor }} /> Pages
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="440"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                        style={{ '--tw-ring-color': accentColor }} 
                                    />
                                </motion.div>
                            </div>

                            {/* ISBN */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaBook className="mr-2" style={{ color: accentColor }} /> ISBN (International Standard Book Number)
                                </label>
                                <input
                                    type="text"
                                    placeholder="978-0143105747"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                    style={{ '--tw-ring-color': accentColor }} 
                                />
                            </motion.div>

                            {/* Language and Publication Date (Inline Grid) */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div variants={itemVariants}>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                        <FaGlobe className="mr-2" style={{ color: accentColor }} /> Language
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="English"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                        style={{ '--tw-ring-color': accentColor }} 
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                        <FaCalendarAlt className="mr-2" style={{ color: accentColor }} /> Pub. Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-4 focus:border-transparent transition duration-150"
                                        style={{ '--tw-ring-color': accentColor }} 
                                    />
                                </motion.div>
                            </div>

                            {/* Rating */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaStar className="mr-2" style={{ color: accentColor }} /> Rating (1.0 to 5.0)
                                </label>
                                <input
                                    type="number"
                                    placeholder="4.5"
                                    step="0.1"
                                    min="1.0"
                                    max="5.0"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                                    style={{ '--tw-ring-color': accentColor }} 
                                />
                            </motion.div>
                            
                            {/* Book Description */}
                            <motion.div variants={itemVariants} className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    <FaInfoCircle className="mr-2" style={{ color: accentColor }} /> Book Synopsis/Description
                                </label>
                                <textarea
                                    placeholder="A brief summary of the book..."
                                    rows="3" // Reduced rows for a tighter fit
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150 resize-none"
                                    style={{ '--tw-ring-color': accentColor }} 
                                />
                            </motion.div>
                            
                        </div>
                    </div>

                    {/* --- Submit Button (Full Width, Animated) --- */}
                    <motion.div variants={itemVariants} className="mt-10">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-lg font-bold text-white 
                                       transition duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-50 
                                       transform hover:scale-[1.01] active:scale-[0.99]"
                            // BACKGROUND COLOR: ff0077
                            style={{ backgroundColor: accentColor, '--tw-ring-color': accentColor }}
                        >
                            <FaCloudUploadAlt className="mr-3 text-2xl" />
                            Add Book to Database
                        </button>
                    </motion.div>

                </motion.form>
            </motion.div>
        </div>
    );
};

export default AddBook;