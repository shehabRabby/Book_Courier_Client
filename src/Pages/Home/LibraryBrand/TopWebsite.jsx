import React from "react";
// --- Swiper Imports ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Asset Imports
import library1 from "../../../assets/toplibrary1.png";
import library2 from "../../../assets/toplibrary2.png";
import library3 from "../../../assets/toplibrary3.png";
import library4 from "../../../assets/toplibrary4.png";
import library5 from "../../../assets/toplibrary5.png";

const topLibraries = [
  {
    name: "New York Public Library",
    location: "New York, USA",
    description: "Iconic research and public library with vast collections and stunning architecture.",
    imageUrl: library1,
    link: "https://www.nypl.org/",
  },
  {
    name: "The British Library",
    location: "London, UK",
    description: "The national library of the United Kingdom, housing over 170 million items.",
    imageUrl: library2,
    link: "https://www.bl.uk/",
  },
  {
    name: "Library of Congress",
    location: "Washington, D.C., USA",
    description: "The largest library in the world, serving as the official research arm of Congress.",
    imageUrl: library3,
    link: "https://www.loc.gov/",
  },
  {
    name: "National Library of China",
    location: "Beijing, China",
    description: "One of the largest libraries in Asia, focusing on Chinese history and ancient culture.",
    imageUrl: library4,
    link: "http://www.nlc.cn/",
  },
  {
    name: "Vatican Apostolic Library",
    location: "Vatican City",
    description: "A treasure trove of historical texts, rare manuscripts, and ancient incunabula.",
    imageUrl: library5,
    link: "https://www.vaticanlibrary.va/",
  },
];

const TopWebsite = () => {
  const accentColor = "#ff0077"; // Consistent Brand Accent

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            Inspired by the World's{" "}
            <span style={{ color: accentColor }}>Greatest Libraries</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto mt-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
          <p className="mt-6 text-lg text-base-content max-w-2xl mx-auto opacity-70 leading-relaxed">
            Exploring the grand institutions that define the standard for global knowledge preservation and cultural heritage.
          </p>
        </div>

        {/* --- Swiper Wrapper --- */}
        <div className="relative library-swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {topLibraries.map((library, index) => (
              <SwiperSlide key={index} className="h-auto pb-4">
                {/* --- Library Card --- */}
                <div className="card h-full bg-base-100 shadow-xl border border-base-300 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                  
                  {/* Image Area */}
                  <figure className="h-64 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                      src={library.imageUrl}
                      alt={library.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <span className="badge badge-secondary font-bold text-xs p-3 shadow-lg uppercase tracking-widest">
                            {library.location.split(',')[0]}
                        </span>
                    </div>
                  </figure>

                  {/* Content Area */}
                  <div className="card-body p-8 bg-base-100">
                    <h3 className="card-title text-xl font-black text-base-content">
                      {library.name}
                    </h3>
                    
                    <p className="text-sm font-bold opacity-50 uppercase tracking-tighter mb-2">
                      {library.location}
                    </p>

                    <p className="text-sm text-base-content opacity-70 leading-relaxed min-h-[60px]">
                      {library.description}
                    </p>

                    <div className="card-actions justify-between items-center mt-6 border-t border-base-200 pt-6">
                      <span className="text-[10px] font-bold opacity-30 uppercase">Authorized Link</span>
                      <a
                        href={library.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-md btn-circle btn-outline group-hover:bg-secondary group-hover:border-secondary transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* --- Swiper Custom Branding (CSS-in-JS logic) --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .library-swiper-container .swiper-button-next,
        .library-swiper-container .swiper-button-prev {
          color: ${accentColor};
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .library-swiper-container .swiper-button-next::after,
        .library-swiper-container .swiper-button-prev::after {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .library-swiper-container .swiper-pagination-bullet-active {
          background: ${accentColor} !important;
          width: 24px;
          border-radius: 10px;
        }
      `}} />
    </section>
  );
};

export default TopWebsite;