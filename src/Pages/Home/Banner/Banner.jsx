import React from "react";
import { Carousel } from "react-responsive-carousel";
import { FaArrowRight, FaBolt, FaGlobe, FaHandsHelping } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Assets
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";

const ACCENT_COLOR = "#ff0077";

const sliderData = [
  {
    image: banner1,
    icon: <FaGlobe className="text-[#ff0077]" />,
    tag: "Global Archive",
    title: "Discover Your Next Great Read",
    description: "Access thousands of technical manuals, timeless classics, and modern bestsellers instantly.",
    linkText: "Explore Catalog",
    alignment: "left",
  },
  {
    image: banner2, // Fixed: Using banner2
    icon: <FaBolt className="text-[#ff0077]" />,
    tag: "Priority Stream",
    title: "Flash Dispatch: 24h Delivery",
    description: "Our logistics network ensures your selected physical assets arrive within one business day.",
    linkText: "View Express Titles",
    alignment: "center",
  },
  {
    image: banner3, // Fixed: Using banner3
    icon: <FaHandsHelping className="text-[#ff0077]" />,
    tag: "Social Impact",
    title: "Community & Literacy Focus",
    description: "Every interaction with our platform contributes to local literacy programs and school funding.",
    linkText: "Join The Mission",
    alignment: "right",
  },
];

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false} 
        interval={6000} 
        transitionTime={700}
        stopOnHover={false}
        className="main-banner-carousel"
      >
        {sliderData.map((slide, index) => (
          <div key={index} className="relative h-[70vh]">
            
            {/* --- Background Asset --- */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover scale-105 animate-slowZoom" 
            />
            
            {/* --- High-Contrast Gradient Layer --- */}
            {/*  */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* --- Content Hub --- */}
            <div className={`absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32
                ${slide.alignment === 'left' ? 'items-start text-left' : ''}
                ${slide.alignment === 'center' ? 'items-center text-center' : ''}
                ${slide.alignment === 'right' ? 'items-end text-right' : ''}
            `}>
              
              <div className="max-w-3xl space-y-6">
                
                {/* Status Tag */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-4">
                  {slide.icon}
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    {slide.tag}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl">
                  {slide.title.split(':').map((part, i) => (
                    <span key={i} className={i === 1 ? "text-[#ff0077] block" : "block"}>
                      {part}
                    </span>
                  ))}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl font-medium text-white/70 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Action CTA */}
                <div className="pt-6">
                  <a 
                    href="/all-books" 
                    className="btn btn-lg border-none text-white px-10 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all group"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    {slide.linkText}
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Slide Index Visualizer */}
            <div className="absolute bottom-10 left-10 md:left-20 flex gap-2">
                {sliderData.map((_, i) => (
                    <div key={i} className={`h-1 transition-all duration-500 rounded-full ${index === i ? 'w-12 bg-[#ff0077]' : 'w-4 bg-white/20'}`} />
                ))}
            </div>

          </div>
        ))}
      </Carousel>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .animate-slowZoom {
          animation: slowZoom 10s infinite alternate ease-in-out;
        }
        .main-banner-carousel .control-dots {
          bottom: 40px !important;
          text-align: right !important;
          padding-right: 5rem !important;
        }
        .main-banner-carousel .dot {
            background: #ff0077 !important;
            box-shadow: none !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;