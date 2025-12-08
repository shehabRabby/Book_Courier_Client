import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// Assuming these imports are correct based on your project structure:
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";

// --- Banner Content Data ---
const sliderData = [
  {
    image: banner1,
    title: "Discover Your Next Great Read",
    description: "Thousands of titles, from new releases to timeless classics, delivered straight to you.",
    linkText: "Shop All Books",
    alignment: "left", // Custom alignment flag for positioning content
  },
  {
    image: banner1,
    title: "Flash Dispatch: 1-Day Delivery",
    description: "Get the bestsellers faster! Priority shipping on all books in our Courier's Choice collection.",
    linkText: "View Priority Titles",
    alignment: "center",
  },
  {
    image: banner1,
    title: "Community & Literacy Focus",
    description: "Every purchase supports local reading programs. Read well, do good.",
    linkText: "Learn More",
    alignment: "right",
  },
];

const Banner = () => {
  return (
    // Carousel setup for auto-play and infinite looping
    <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false} // Hide status text (e.g., "1 of 3")
        interval={5000} // Set slide duration to 5 seconds
        transitionTime={500} // Set transition speed
    >
      {sliderData.map((slide, index) => (
        <div key={index} className="relative h-96 md:h-[60vh] lg:h-[75vh]">
          {/* --- 1. Background Image --- */}
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover" 
          />
          
          {/* --- 2. Text Overlay Content (Positioning and Styling) --- */}
          <div 
            className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center text-white p-6 md:p-12 
                ${slide.alignment === 'left' ? 'items-start text-left' : ''}
                ${slide.alignment === 'center' ? 'items-center text-center' : ''}
                ${slide.alignment === 'right' ? 'items-end text-right' : ''}
            `}
            // Optional: Add a subtle dark overlay for better text contrast
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} 
          >
            <div className="max-w-xl">
              {/* Title */}
              <h2 className={`text-4xl md:text-6xl font-extrabold mb-4 transition duration-700 transform ${slide.alignment === 'center' ? 'md:translate-y-0' : 'md:translate-y-[-20px]'} hover:translate-y-0`}>
                {slide.title}
              </h2>

              {/* Short Description */}
              <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
                {slide.description}
              </p>

              {/* Link Button (btn-secondary applied here) */}
              <a 
                href="/all-books" 
                className="btn btn-lg btn-secondary shadow-xl transition duration-300 transform hover:scale-105"
              >
                {slide.linkText}
              </a>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;