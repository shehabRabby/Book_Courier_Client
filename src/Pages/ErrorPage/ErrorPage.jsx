import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft, FaCodeBranch } from 'react-icons/fa';

const ErrorPage = () => {
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
            
            {/* 1. Floating Animated Background Glows (Updated to Amber/Gold) */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-48 h-48 bg-amber-500 rounded-full opacity-5 blur-[100px]"
                variants={floatVariants}
                animate="animate"
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-slate-400 rounded-full opacity-5 blur-[120px]"
                variants={floatVariants}
                animate="animate"
            />

            {/* 2. Floating Code Fragment Icon */}
            <motion.div
                className="absolute top-10 right-10 text-slate-800 text-6xl opacity-20"
                variants={floatVariants}
                animate="animate"
                style={{ scale: 0.8 }}
            >
                <FaCodeBranch />
            </motion.div>
            
            {/* Main Animated Container */}
            <motion.div
                className="text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {/* 404 Code (Updated to Amber/Gold with Glow) */}
                <motion.div variants={itemVariants}>
                    <h1 
                        className="text-[10rem] sm:text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600 drop-shadow-[0_10px_30px_rgba(245,158,11,0.3)] mb-20 italic"
                        animate={{ scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        404
                    </h1>
                </motion.div>

                {/* Status Message */}
                <motion.div 
                    className="mt-[-3rem] sm:mt-[-5rem]" 
                    variants={itemVariants} 
                >
                    <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 flex items-center justify-center uppercase italic tracking-tighter">
                        <FaExclamationTriangle className="mr-4 text-amber-500" /> 
                        Coordinate Lost
                    </h2>
                </motion.div>

                {/* Descriptive Text */}
                <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-xl mx-auto mb-12 mt-4 border-t border-b border-slate-800 py-6 uppercase tracking-widest font-bold opacity-60">
                    The requested <span className="text-amber-500/80 italic font-black">Digital Asset</span> has been moved, archived, or purged from the system core.
                </motion.p>
                
                {/* Go Back Button (Updated to Premium Gold Button) */}
                <motion.div variants={itemVariants}>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center mx-auto px-12 py-4 rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.2)] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 
                                   bg-amber-600 text-[#0b0f1a] 
                                   hover:bg-amber-500 hover:shadow-[0_15px_50px_rgba(245,158,11,0.4)]
                                   transform hover:scale-110 active:scale-95 italic"
                    >
                        <FaArrowLeft className="mr-3" /> Re-enter Command Center
                    </button>
                </motion.div>
                
            </motion.div>
            
            {/* Bottom Accent */}
            <div className="absolute bottom-10 opacity-20">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] italic text-slate-500">
                    System Protocol Error • BookCourier v2.4
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;