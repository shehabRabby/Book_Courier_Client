import React from "react";
// --- Swiper Imports ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import required modules
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles
import library1 from "../../../assets/toplibrary1.png";
import library2 from "../../../assets/toplibrary2.png";
import library3 from "../../../assets/toplibrary3.png";
import library4 from "../../../assets/toplibrary4.png";
import library5 from "../../../assets/toplibrary5.png";

// --- Data for Top Libraries (Uses imported images) ---
const topLibraries = [
  {
    name: "New York Public Library",
    location: "New York, USA",
    description:
      "Iconic research and public library with vast collections and architectural.",
    imageUrl: library1,
    link: "https://www.nypl.org/",
  },
  {
    name: "The British Library",
    location: "London, UK",
    description:
      "The national library of the United Kingdom, housing over 170 million items.",
    imageUrl: library2,
    link: "https://www.bl.uk/",
  },
  {
    name: "Library of Congress",
    location: "Washington, D.C., USA",
    description:
      "The largest library in the world, serving as the research arm of the USA",
    imageUrl: library3,
    link: "https://www.loc.gov/",
  },
  {
    name: "National Library of China",
    location: "Beijing, China",
    description:
      "One of the largest libraries in Asia, focusing on Chinese history and culture.",
    imageUrl: library4,
    link: "http://www.nlc.cn/",
  },
  {
    name: "Vatican Apostolic Library",
    location: "Vatican City",
    description:
      "A treasure trove of historical texts, manuscripts, and incunabula.",
    imageUrl: library5,
    link: "https://www.vaticanlibrary.va/",
  },
];

const TopWebsite = () => {
  // Renamed component
  return (
    <section className="py-16 md:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-neutral tracking-tight">
            Inspired by the World's{" "}
            <span className="text-secondary">Greatest Libraries</span>
          </h2>
          <p className="mt-4 text-xl text-base-content max-w-3xl mx-auto opacity-70">
            A look at the institutions that set the standard for knowledge and
            preservation.
          </p>
        </div>

        {/* --- Swiper Wrapper --- */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          // 💡 Custom class for styling arrows/dots externally
          className="pb-1 swiper-library-showcase"
        >
          {topLibraries.map((library, index) => (
            <SwiperSlide key={index} className="h-auto">
              {/* --- Library Card Content --- */}
              <div className="card bg-white shadow-xl overflow-hidden transition duration-500 transform hover:shadow-2xl hover:-translate-y-1 group">
                {/* Image Area */}
                <figure className="h-70 overflow-hidden">
                  <img
                    src={library.imageUrl}
                    alt={`Exterior of ${library.name}`}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    // Removed inline placeholder styling since you have actual images
                  />
                </figure>

                <div className="card-body p-6">
                  {/* Title */}
                  <h3 className="card-title text-2xl font-bold text-neutral">
                    {library.name}
                  </h3>

                  {/* Location - Styling refined for better visibility */}
                  <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                    {library.location}
                  </p>

                  {/* Description */}
                  <p className="text-base text-base-content opacity-90">
                    {library.description}
                  </p>

                  {/* Link Button */}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopWebsite;
