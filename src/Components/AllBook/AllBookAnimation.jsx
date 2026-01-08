import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Globe,
  Library,
  ArrowRight,
} from "lucide-react";

const AllBookAnimation = ({ totalCount }) => {
  const titleLetters = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      },
    },
  };

  const marqueeItems = [
    {
      icon: <Globe className="w-4 h-4 text-primary" />,
      text: "Available in 45+ Languages",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-accent" />, // Using your Accent pink
      text: "New Titles Daily",
    },
    {
      icon: <Zap className="w-4 h-4 text-secondary" />, // Using brand-pink
      text: "Instant Digital Sync",
    },
  ];

  return (
    <section 
      className="hidden md:flex relative h-[65vh] flex-col overflow-hidden bg-base-100 text-base-content transition-colors duration-300"
    >
      
      {/* LAYER: Large Ghost Text - Subtle adaptation for light/dark */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] z-0">
        <h1 className="text-[18vw] font-black uppercase leading-none tracking-tighter">
          LITERATURE
        </h1>
      </div>

      {/* LAYER: Background Glows - Using your brand variables */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* MAIN HERO CONTENT */}
      <div className="container mx-auto px-10 relative z-10 flex-grow flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full">
          
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <span className="px-3 py-1 bg-base-content/5 border border-base-content/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-md">
                  Vol. 2026 Edition
                </span>
              </motion.div>

              <motion.div initial="hidden" animate="visible">
                <motion.h1
                  variants={titleLetters}
                  className="text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-4 uppercase"
                >
                  Explore Our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic font-serif font-light lowercase">
                    Curated
                  </span> Collection
                </motion.h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base text-base-content/60 font-medium max-w-md leading-relaxed"
              >
                From timeless literary classics to cutting-edge technical manuals. 
                Find exactly what you need to advance your journey.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button className="btn btn-primary rounded-xl px-10 shadow-lg shadow-primary/20 transition-all group border-none text-white">
                Explore Archive
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Column Visuals - Card adapts to Light/Dark */}
          <div className="flex-1 relative h-[350px] w-full max-w-md">
             <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-[300px] bg-base-200/40 backdrop-blur-3xl rounded-[2rem] border border-base-content/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center z-10"
            >
              <div className="p-4 bg-primary/10 rounded-2xl mb-4 border border-primary/20">
                <Library className="w-10 h-10 text-primary" />
              </div>
              <h4 className="text-5xl font-black tracking-tighter text-base-content">
                {totalCount || "12k+"}
              </h4>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mt-2">Total Books</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker - Background adapts to Light/Dark */}
      <div className="bg-base-200/50 py-4 border-y border-base-content/5 overflow-hidden relative z-20">
        <div className="flex w-max">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-16 items-center px-10"
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {marqueeItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30">
                    {item.icon} {item.text}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-8 w-full bg-base-100" />
    </section>
  );
};

export default AllBookAnimation;