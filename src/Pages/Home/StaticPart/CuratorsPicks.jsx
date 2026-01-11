import React from "react";
// FIX 1: Import Link component for client-side routing
import { Link } from "react-router";
// Assuming you are using IoIcons from react-icons
import { IoArrowForwardOutline } from "react-icons/io5";
// Imported Images
import banner1 from "../../../assets/new6.jpg";
import banner2 from "../../../assets/new3.jpg";
import banner3 from "../../../assets/banner6.jpg";

// --- Data for the Featured Pick ---
const featuredPick = {
  theme: "The Courier's Choice: Bestsellers Delivered",
  tagline:
    "Experience the fastest way to get today's most popular books right to your doorstep.",
  description:
    "Our monthly spotlight features the top 5 most requested books, guaranteed to be in stock, quality-checked, and prioritized for 1-day dispatch. Start reading sooner.",
  link: "/collections/monthly-bestsellers", // Updated images array to use the imported banner1 for the first slot
  images: [
    { url: banner1, alt: "Featured banner image showing books or delivery" },
    {
      url: banner2,
      alt: "A close-up of a delivery box being opened to reveal a book",
    },
    {
      url: banner3,
      alt: "A library shelf with diverse books and a spotlight on a particular title",
    },
  ],
};

const CuratorsPicks = () => {
  return (
    <section id="curators-picks" className="py-16 md:py-28 bg-base-100">
           {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       {" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   {" "}
          <div className="lg:order-1 order-2">
                       {" "}
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fffff] mb-3">
                            BookCourier Service Spotlight            {" "}
            </h3>
                       {" "}
            <h2 className="text-5xl font-extrabold text-primary tracking-tight mb-6">
                            {featuredPick.theme}           {" "}
            </h2>
                       {" "}
            <p className="text-xl text-base-content opacity-90 mb-6">
                            {featuredPick.tagline}           {" "}
            </p>
                       {" "}
            <p className="text-base text-base-content mb-8">
                            {featuredPick.description}           {" "}
            </p>
            <Link
              to={"/all-books"}
              className="btn btn-lg bg-indigo-600 hover:bg-indigo-700 border-none text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 group transition-all duration-300 rounded-xl"
            >
              View the Full Collection
              <IoArrowForwardOutline className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
                     {" "}
          </div>
                             {" "}
          <div className="lg:order-2 order-1 grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                                   {" "}
            <div className="col-span-2 aspect-h-3 aspect-w-2 rounded-lg overflow-hidden shadow-2xl">
                           {" "}
              <img
                src={featuredPick.images[0].url}
                alt={featuredPick.images[0].alt}
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
                         {" "}
            </div>
                       {" "}
            <div className="col-span-1 flex flex-col space-y-3 md:space-y-4 lg:space-y-6">
                           {" "}
              <div className="aspect-h-3 aspect-w-2 rounded-lg overflow-hidden shadow-xl">
                               {" "}
                <img
                  src={featuredPick.images[1].url}
                  alt={featuredPick.images[1].alt}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
                             {" "}
              </div>
                           {" "}
              <div className="aspect-h-3 aspect-w-2 rounded-lg overflow-hidden shadow-xl">
                               {" "}
                <img
                  src={featuredPick.images[2].url}
                  alt={featuredPick.images[2].alt}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </section>
  );
};

export default CuratorsPicks;
