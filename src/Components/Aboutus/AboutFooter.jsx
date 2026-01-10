import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { ArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/solid';

const AboutFooter = () => {
    return (
        <section className="py-20 px-6 relative overflow-hidden bg-base-100">
            {/* Background Glows (Subtle) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] bg-neutral dark:bg-base-300 border border-white/5 shadow-2xl"
                >
                    <div className="relative z-10 grid lg:grid-cols-2 items-center p-8 md:p-16 gap-12">
                        
                        {/* Left Side: Refined Text */}
                        <div className="text-left space-y-6">
                            
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase">
                                START YOUR <br />
                                <span className="text-primary italic font-serif lowercase">literary</span> JOURNEY.
                            </h2>

                            <p className="text-base text-white/50 max-w-sm leading-relaxed font-medium">
                                Join 25,000+ readers who are already moving knowledge faster than ever before. Simple, secure, and fast.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    to="/register"
                                    className="group flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    JOIN NOW <ArrowUpRightIcon className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                </Link>

                                <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all backdrop-blur-md text-sm">
                                    PARTNER WITH US
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Enhanced GIF Visual */}
                        <div className="relative">
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-20 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm"
                            >
                                {/* GIF Container with Gradient Fade */}
                                <div className="relative h-[300px] md:h-[380px] w-full">
                                    <img 
                                        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGdzM2sxbTh1enc0dXE2czNweDZpa2dvY2s1cHFzajloYjhtZmlxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QpLZuSEFrHj2vmJXzs/giphy.gif" 
                                        alt="Network Animation"
                                        className="w-full h-full object-cover mix-blend-lighten opacity-70 grayscale-[30%]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral/90 via-transparent to-transparent" />
                                </div>
                                
                                {/* Floating Stats - More Minimalist */}
                                <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                                    <div className="flex-1 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                        <p className="text-[9px] uppercase font-bold text-primary/80 mb-0.5">Live Nodes</p>
                                        <p className="text-xl font-black text-white">1,284</p>
                                    </div>
                                    <div className="flex-1 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                        <p className="text-[9px] uppercase font-bold text-primary/80 mb-0.5">Active</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-xl font-black text-white">428</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutFooter;