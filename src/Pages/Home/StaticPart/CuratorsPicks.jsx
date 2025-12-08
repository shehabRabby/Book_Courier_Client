import React from 'react';
// Assuming you are using IoIcons from react-icons
import { IoArrowForwardOutline } from 'react-icons/io5';
// Imported Image
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";

// --- Data for the Featured Pick ---
const featuredPick = {
  theme: "The Courier's Choice: Bestsellers Delivered",
  tagline: "Experience the fastest way to get today's most popular books right to your doorstep.",
  description: "Our monthly spotlight features the top 5 most requested books, guaranteed to be in stock, quality-checked, and prioritized for 1-day dispatch. Start reading sooner.",
  link: "/collections/monthly-bestsellers",
  // Updated images array to use the imported banner1 for the first slot
  images: [
    { url: banner1, alt: "Featured banner image showing books or delivery" }, // <-- USES IMPORTED IMAGE
    { url: banner2, alt: "A close-up of a delivery box being opened to reveal a book" }, 
    { url: banner3, alt: "A library shelf with diverse books and a spotlight on a particular title" },
  ],
};

const CuratorsPicks = () => {
  return (
    <section id="curators-picks" className="py-16 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* --- Text Content (Left Column) --- */}
          <div className="lg:order-1 order-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
              BookCourier Service Spotlight
            </h3>
            <h2 className="text-5xl font-extrabold text-neutral tracking-tight mb-6">
              {featuredPick.theme}
            </h2>
            <p className="text-xl text-base-content opacity-90 mb-6">
              {featuredPick.tagline}
            </p>
            <p className="text-base text-base-content mb-8">
              {featuredPick.description}
            </p>

            {/* CTA Button */}
            <a 
              href={featuredPick.link} 
              className="btn btn-lg btn-secondary shadow-lg hover:shadow-xl group transition duration-300"
            >
              View the Full Collection
              <IoArrowForwardOutline className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* --- Image Gallery (Right Column) --- */}
          <div className="lg:order-2 order-1 grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            
            {/* Main large image (takes up 2/3 of the width) */}
            <div className="col-span-2 aspect-h-3 aspect-w-2 rounded-lg overflow-hidden shadow-2xl">
              {/* === USES IMPORTED banner1.png === */}
              <img 
                src={featuredPick.images[0].url} 
                alt={featuredPick.images[0].alt}
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
                // REMOVE style prop when integrating actual images (it was for placeholder colors)
                // style={{ backgroundColor: '#e0e7ff', minHeight: '100%' }} 
              />
            </div>

            {/* Stack of two smaller images (takes up 1/3 of the width) */}
            <div className="col-span-1 flex flex-col space-y-3 md:space-y-4 lg:space-y-6">
              {/* Small Image 1 */}
              <div className="aspect-h-3 aspect-w-2 rounded-lg overflow-hidden shadow-xl">
                {/* === PLACEHOLDER 2 === */}
                <img 
                  src={featuredPick.images[1].url} 
                  alt={featuredPick.images[1].alt}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  style={{ backgroundColor: '#f3f4f6', minHeight: '100%' }}
                />
              </div>

              {/* Small Image 2 */}
              <div className="aspect-h-3 aspect-w-2 rounded-lg overflow-hidden shadow-xl">
                {/* === PLACEHOLDER 3 === */}
                <img 
                  src={featuredPick.images[2].url} 
                  alt={featuredPick.images[2].alt}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  style={{ backgroundColor: '#e5e7eb', minHeight: '100%' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratorsPicks;