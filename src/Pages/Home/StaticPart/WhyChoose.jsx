import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IoSpeedometerOutline, 
  IoShieldCheckmarkOutline, 
  IoEarthOutline, 
  IoArrowForward 
} from 'react-icons/io5';

const features = [
  {
    icon: <IoSpeedometerOutline className='text-primary' />,
    title: "Rapid Deployment",
    description: "Our proprietary logistics network ensures your assets reach your doorstep within 1-3 business days, fully tracked.",
    tag: "STATUS: FAST",
  },
  {
    icon: <IoShieldCheckmarkOutline className='text-primary'  />,
    title: "Quality Verified",
    description: "Every book in our archive undergoes a strict manual inspection protocol to guarantee pristine physical condition.",
    tag: "STATUS: SECURE",
  },
  {
    icon: <IoEarthOutline className='text-primary' />,
    title: "Global Literacy",
    description: "A dedicated percentage of every transaction is diverted to support independent authors and local literacy programs.",
    tag: "STATUS: ACTIVE",
  },
];

const WhyChoose = () => {
  return (
    <section
      id="why-choose"
      className="py-24  dark:bg-slate-950 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Decoration - Glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 dark:via-indigo-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Header Section --- */}
        <div className="text-center mb-20">
          <p className="text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            System Advantages
          </p>

          {/* 🎨 FIXED: Full visibility in Dark Mode using text-white */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
            Why Readers Sync with{" "}
            <span className="text-primary ">
              BookCourier
            </span>
          </h2>

          <div className="h-1.5 w-24 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-8 rounded-full shadow-lg shadow-indigo-500/20" />
        </div>

        {/* --- Feature Grid --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" group relative p-10  dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] transition-all duration-500 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              {/* Feature Icon Container */}
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl text-emerald-500 dark:text-emerald-400 mb-8 shadow-sm border border-slate-100 dark:border-slate-700 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>

              {/* Status Tag */}
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest block mb-3 uppercase">
                {feature.tag}
              </span>

              {/* Titles optimized for high visibility */}
              <h3 className="text-2xl font-bold text-primary  mb-4 tracking-tight">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-[#818cf8] leading-relaxed font-medium">
                {feature.description}
              </p>

              {/* Subtle Decorative Number */}
              <span className="absolute top-8 right-10 text-5xl font-extrabold text-slate-900/[0.05] dark:text-white/[0.05] group-hover:text-indigo-500/10 transition-colors">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* --- Standardized Call to Action --- */}
        <div className="text-center mt-24">
          <Link
            to="/all-books"
            className="group inline-flex items-center px-10 py-4 bg-indigo-600 dark:bg-indigo-600 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:translate-y-[-4px] hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
          >
            Access Full Catalog
            <IoArrowForward className="ml-3 text-lg transition-transform group-hover:translate-x-2" />
          </Link>

          {/* Supporting text with visibility fix for dark mode */}
          <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
            <span className="h-px w-8 bg-slate-300 dark:bg-slate-700"></span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
              Encryption Enabled • Worldwide Shipping • Secure Hand-off
            </p>
            <span className="h-px w-8 bg-slate-300 dark:bg-slate-700"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;