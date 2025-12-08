import React from "react";
// Since we are changing to a static grid, we remove Swiper imports
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css"; 

// --- Data for Top Libraries (Placeholders for Images and Links) ---
const topLibraries = [
  {
    name: "New York Public Library",
    location: "New York, USA",
    description: "Iconic research and public library with vast collections and architectural grandeur.",
    imageUrl: "/img/nypl_icon.jpg", // Placeholder for image
    link: "https://www.nypl.org/",
  },
  {
    name: "The British Library",
    location: "London, UK",
    description: "The national library of the United Kingdom, housing over 170 million items.",
    imageUrl: "/img/british_library_icon.jpg", // Placeholder for image
    link: "https://www.bl.uk/",
  },
  {
    name: "Library of Congress",
    location: "Washington, D.C., USA",
    description: "The largest library in the world, serving as the research arm of the U.S. Congress.",
    imageUrl: "/img/library_of_congress_icon.jpg", // Placeholder for image
    link: "https://www.loc.gov/",
  },
];

const TopLibraryShowcase = () => {
  return (
    // Section adjusted for full width inside max-w-7xl
    <section className="py-16 md:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-neutral tracking-tight">
            Inspired by the World's <span className="text-secondary">Greatest Libraries</span>
          </h2>
          <p className="mt-4 text-xl text-base-content max-w-3xl mx-auto opacity-70">
            A look at the institutions that set the standard for knowledge and preservation.
          </p>
        </div>

        {/* --- Library Cards Grid (3 Columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {topLibraries.map((library, index) => (
            <div 
              key={index} 
              className="card bg-white shadow-xl overflow-hidden transition duration-500 transform hover:shadow-2xl hover:-translate-y-1 group"
            >
              
              {/* Image Area */}
              <figure className="h-48 overflow-hidden">
                <img 
                  src={library.imageUrl} 
                  alt={`Exterior of ${library.name}`} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                  // Placeholder styling (remove once images are added)
                  style={{ backgroundColor: '#f3f4f6' }} 
                />
              </figure>

              <div className="card-body p-6">
                {/* Title */}
                <h3 className="card-title text-2xl font-bold text-neutral">
                  {library.name}
                </h3>
                
                {/* Location */}
                <p className="text-sm font-semibold text-primary mb-2">{library.location}</p>
                
                {/* Description */}
                <p className="text-base text-base-content opacity-90">
                  {library.description}
                </p>
                
                {/* Link Button (using btn-secondary as requested) */}
                <div className="card-actions justify-end mt-4">
                  <a 
                    href={library.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary hover:shadow-lg transition duration-300"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopLibraryShowcase;