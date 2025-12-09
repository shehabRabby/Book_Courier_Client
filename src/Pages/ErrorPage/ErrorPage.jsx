import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft, FaCodeBranch } from 'react-icons/fa';

const ErrorPage = () => {
    const navigate = useNavigate();

    // --- Framer Motion Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 },
        },
    };

    const floatVariants = {
        animate: {
            x: [0, 20, 0, -20, 0],
            y: [0, -15, 0, 15, 0],
            rotate: [0, 5, 0, -5, 0],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
            
            {/* 1. Floating Animated Background Elements */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500 rounded-full opacity-10 blur-3xl"
                variants={floatVariants}
                animate="animate"
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#ff0077] rounded-full opacity-10 blur-3xl"
                variants={floatVariants}
                animate="animate"
            />

            {/* 2. Floating Code Fragment Icon */}
            <motion.div
                className="absolute top-10 right-10 text-gray-700 text-6xl opacity-5"
                variants={floatVariants}
                animate="animate"
                style={{ scale: 0.8 }}
            >
                <FaCodeBranch />
            </motion.div>
            
            {/* Main Animated Container (z-index ensures it's above the background effects) */}
            <motion.div
                className="text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {/* 404 Code (Reduced font size slightly for better fit) */}
                <motion.div variants={itemVariants}>
                    <h1 
                        // Adjusted font sizes to prevent vertical overlap: text-[10rem] sm:text-[14rem]
                        className="text-[10rem] sm:text-[14rem] font-black leading-none text-[#ff0077] drop-shadow-lg mb-20"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        404
                    </h1>
                </motion.div>

                {/* Status Message (Adjusted Negative Margin to pull up and align below 404) */}
                <motion.div 
                    // Changed mt-[-5rem] to mt-[-3rem] (small screen) and mt-[-8rem] to mt-[-5rem] (large screen)
                    className="mt-[-3rem] sm:mt-[-5rem]" 
                    variants={itemVariants} 
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 flex items-center justify-center">
                        <FaExclamationTriangle className="mr-3 text-yellow-400 drop-shadow-md" /> 
                        Access Denied / Not Found
                    </h2>
                </motion.div>

                {/* Descriptive Text (Slightly larger margin top for separation) */}
                <motion.p variants={itemVariants} className="text-gray-400 text-xl max-w-xl mx-auto mb-12 mt-4 border-t border-b border-gray-700 py-4">
                    The requested **digital coordinate** seems to be broken, vanished into the **void of the internet**, or never existed.
                </motion.p>
                
                {/* Go Back Button */}
                <motion.div variants={itemVariants}>
                    <button
                        onClick={() => navigate(-1)} // Go back in browser history
                        className="flex items-center mx-auto px-10 py-4 rounded-full shadow-2xl text-xl font-bold transition-all duration-300 
                                   bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                                   hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-offset-4 focus:ring-purple-500/80 focus:ring-offset-gray-900 
                                   transform hover:scale-110 active:scale-105"
                    >
                        <FaArrowLeft className="mr-3" /> Get Me Out Of Here!
                    </button>
                </motion.div>
                
            </motion.div>
            
        </div>
    );
};

export default ErrorPage;