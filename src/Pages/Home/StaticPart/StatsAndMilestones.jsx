import React from 'react';
// Assuming you are using IoIcons from react-icons
import { IoBookOutline, IoTimeOutline, IoGlobeOutline, IoPeopleOutline } from 'react-icons/io5'; 

// --- Data for the Statistics ---
const stats = [
  {
    icon: <IoBookOutline className="w-8 h-8" />,
    value: "25,000+",
    label: "Books Delivered",
    description: "Our total volume of happy readers served since launch.",
    color: "text-primary",
  },
  {
    icon: <IoTimeOutline className="w-8 h-8" />,
    value: "1.5 Days",
    label: "Average Delivery Time",
    description: "Faster than standard shipping, guaranteed by BookCourier.",
    color: "text-success",
  },
  {
    icon: <IoGlobeOutline className="w-8 h-8" />,
    value: "100+",
    label: "Cities Covered",
    description: "Our growing network ensures your books reach you anywhere.",
    color: "text-info",
  },
  {
    icon: <IoPeopleOutline className="w-8 h-8" />,
    value: "4.9 / 5",
    label: "Customer Rating",
    description: "Rated highly for speed, book quality, and service.",
    color: "text-warning",
  },
];

const StatsAndMilestones = () => {
  return (
    <section id="milestones" className="py-16 md:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-neutral tracking-tight">
            Trusted by Thousands of <span className="text-primary">Happy Readers</span>
          </h2>
          <p className="mt-4 text-xl text-base-content max-w-3xl mx-auto opacity-70">
            A look at the key metrics that define the BookCourier experience.
          </p>
        </div>

        {/* --- Stats Grid with Animated Cards --- */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="card bg-white shadow-lg transition duration-500 hover:shadow-2xl hover:bg-base-200 transform hover:-translate-y-2 group"
            >
              <div className="card-body items-center text-center p-6">
                
                {/* Icon Wrapper */}
                <div className={`p-4 rounded-full bg-opacity-10 transition duration-500 group-hover:scale-110 ${stat.color} bg-current`}>
                  {stat.icon}
                </div>
                
                {/* Value */}
                <p className="text-4xl font-extrabold text-neutral mt-3 mb-1">
                  {stat.value}
                </p>
                
                {/* Label */}
                <h3 className="text-lg font-semibold text-base-content">
                  {stat.label}
                </h3>
                
                {/* Description (Visible on hover/desktop-focus for extra context) */}
                <p className="text-xs text-gray-500 mt-2 opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block">
                  {stat.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsAndMilestones;