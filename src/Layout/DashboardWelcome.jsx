import React from 'react';
import { motion } from 'framer-motion';

import { FaCalendarAlt, FaCrown, FaFingerprint } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import useRole from '../Role/useRole';

const DashboardWelcome = () => {
    const { user } = useAuth();
    const [role] = useRole();

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden p-8 md:p-14 rounded-[3.5rem] bg-[#0f172a] text-white shadow-2xl border border-slate-800"
        >
            {/* Soft Gradient Overlays for Luxury Look */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-slate-400/5 rounded-full blur-[100px]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                <div className="space-y-6">
                    {/* Role Badge - Gold Minimalist */}
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                        <FaCrown className="text-amber-500 text-[10px]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                            Authorized {role} Console
                        </span>
                    </div>

                    {/* Typography - Clean & Bold */}
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-none text-white">
                            Welcome back, <br />
                            <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-200/50 uppercase italic tracking-tighter">
                                {user?.displayName || "Administrator"}
                            </span>
                        </h1>
                        <p className="text-sm md:text-base font-medium text-slate-400 max-w-lg leading-relaxed mt-4">
                            Your executive dashboard is synchronized. Access all system resources and management tools from this secure gateway.
                        </p>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/50">
                        <div className="flex items-center gap-3 text-slate-500">
                            <FaCalendarAlt className="text-xs" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{today}</span>
                        </div>
                        <div className="flex items-center gap-3 text-amber-500/80">
                            <FaFingerprint className="text-xs" />
                            <span className="text-[10px] font-bold uppercase tracking-widest italic">Security: High-Level</span>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Graphic Element */}
                <div className="hidden lg:block relative">
                    <div className="w-40 h-40 border-[1px] border-slate-700 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                         <div className="w-32 h-32 border-[1px] border-dashed border-slate-500 rounded-full opacity-20"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black italic tracking-tighter leading-none text-white">CORE</span>
                        <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest mt-1 opacity-60">System v2.4</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardWelcome;