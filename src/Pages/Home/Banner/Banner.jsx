import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBolt, FaGlobe, FaHandsHelping, FaCrown } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Assets
import banner1 from "../../../assets/banner4.jpg";
import banner2 from "../../../assets/banner5.jpg";
import banner3 from "../../../assets/banner6.jpg";
import banner4 from "../../../assets/banner7.jpg";

// 🎨 THEME ADJUSTMENT: Using our professional Indigo Primary
const ACCENT_COLOR = "#4F46E5"; 
const SECONDARY_ACCENT = "#10B981"; // Emerald for icons/highlights

const sliderData = [
  {
    image: banner1,
    icon: <FaGlobe />,
    tag: "Global Archive",
    title: "Discover Your Next : Great Read",
    description: "Access thousands of technical manuals, timeless classics, and modern bestsellers instantly.",
    linkText: "Explore Catalog",
    alignment: "left",
  },
  {
    image: banner2,
    icon: <FaBolt />,
    tag: "Priority Stream",
    title: "Flash Dispatch : 24h Delivery",
    description: "Our logistics network ensures your selected physical assets arrive within one business day.",
    linkText: "View Express Titles",
    alignment: "center",
  },
  {
    image: banner3,
    icon: <FaHandsHelping />,
    tag: "Social Impact",
    title: "Community & : Literacy Focus",
    description: "Every interaction with our platform contributes to local literacy programs and school funding.",
    linkText: "Join The Mission",
    alignment: "right",
  },
  {
    image: banner4,
    icon: <FaCrown />,
    tag: "Exclusive Access",
    title: "Premium Library : Members Only",
    description: "Join our elite circle to unlock rare manuscripts and early access to international bestsellers.",
    linkText: "Upgrade Now",
    alignment: "left",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false} 
        interval={6000} 
        transitionTime={700}
        stopOnHover={false}
        onChange={(index) => setCurrentIndex(index)}
        className="main-banner-carousel"
      >
        {sliderData.map((slide, index) => (
          <div key={index} className="relative h-[60vh] md:h-[70vh]">
            
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover scale-105 animate-slowZoom" 
            />
            
            {/* 🎨 DARK OVERLAYS: Using Slate-950 for a more premium look than pure black */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            <div className={`absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32 z-20
                ${slide.alignment === 'left' ? 'items-start text-left' : ''}
                ${slide.alignment === 'center' ? 'items-center text-center' : ''}
                ${slide.alignment === 'right' ? 'items-end text-right' : ''}
            `}>
              
              <AnimatePresence mode="wait">
                {currentIndex === index && (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl space-y-6"
                  >
                    {/* Status Tag */}
                    <motion.div 
                      custom={0} variants={textRevealVariants}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-4"
                    >
                      {/* 🎨 ICON COLOR: Emerald for a fresh professional look */}
                      <span className="text-emerald-400 text-lg">{slide.icon}</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-100">
                        {slide.tag}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2 
                      custom={1} variants={textRevealVariants}
                      className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl"
                    >
                      {slide.title.split(':').map((part, i) => (
                        <span key={i} className={i === 1 ? "text-indigo-400 block" : "block"}>
                          {part}
                        </span>
                      ))}
                    </motion.h2>

                    {/* Description */}
                    <motion.p 
                      custom={2} variants={textRevealVariants}
                      className="text-lg md:text-xl font-medium text-slate-300 max-w-2xl leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Action CTA */}
                    <motion.div custom={3} variants={textRevealVariants} className="pt-6">
                      <a 
                        href="/all-books" 
                        className="btn btn-lg border-none text-white px-10 rounded-xl font-bold text-sm uppercase tracking-wider shadow-xl hover:translate-y-[-4px] transition-all group inline-flex items-center"
                        style={{ backgroundColor: ACCENT_COLOR }}
                      >
                        {slide.linkText}
                        <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Slide Index Visualizer */}
            <div className="absolute bottom-10 left-10 md:left-20 flex gap-3 z-30">
                {sliderData.map((_, i) => (
                    <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-16 bg-indigo-500' : 'w-6 bg-white/30'}`} />
                ))}
            </div>

          </div>
        ))}
      </Carousel>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slowZoom {
          animation: slowZoom 12s infinite alternate ease-in-out;
        }
        .main-banner-carousel .control-dots {
          display: none !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;