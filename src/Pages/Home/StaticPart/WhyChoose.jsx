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
    icon: <IoSpeedometerOutline />,
    title: 'Rapid Deployment',
    description: 'Our proprietary logistics network ensures your assets reach your doorstep within 1-3 business days, fully tracked.',
    tag: 'STATUS: FAST'
  },
  {
    icon: <IoShieldCheckmarkOutline />,
    title: 'Quality Verified',
    description: 'Every book in our archive undergoes a strict manual inspection protocol to guarantee pristine physical condition.',
    tag: 'STATUS: SECURE'
  },
  {
    icon: <IoEarthOutline />,
    title: 'Global Literacy',
    description: 'A dedicated percentage of every transaction is diverted to support independent authors and local literacy programs.',
    tag: 'STATUS: ACTIVE'
  },
];

const WhyChoose = () => {
  return (
    <section id="why-choose" className="py-24 bg-base-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-base-content/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-20">
          <p className="text-[#ff0077] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            System Advantages
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
            Why Readers Sync with <span className="text-[#ff0077]">BookCourier</span>
          </h2>
          <div className="h-1.5 w-24 bg-[#ff0077] mx-auto mt-6 rounded-full" />
        </div>

        {/* --- Feature Grid --- */}
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 bg-base-200 border border-base-300 rounded-[2.5rem] transition-all duration-500 hover:border-[#ff0077] hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10"
            >
              {/* Feature Icon Container */}
              <div className="w-16 h-16 bg-base-100 rounded-2xl flex items-center justify-center text-3xl text-[#ff0077] mb-6 shadow-inner transition-transform duration-500 group-hover:rotate-6">
                {feature.icon}
              </div>

              {/* Status Tag */}
              <span className="text-[9px] font-bold text-[#ff0077] opacity-60 tracking-widest block mb-2">
                {feature.tag}
              </span>
              
              <h3 className="text-2xl font-black text-base-content mb-4 tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                {feature.description}
              </p>

              {/* Subtle Decorative Number */}
              <span className="absolute top-8 right-8 text-4xl font-black text-base-content/5 opacity-0 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* --- Final Call to Action --- */}
        <div className="text-center mt-20">
          <Link 
            to="/all-books" 
            className="group btn btn-lg bg-base-content text-base-100 border-none hover:bg-[#ff0077] hover:text-white px-10 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300"
          >
            Access Full Catalog
            <IoArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="mt-6 text-[10px] font-bold uppercase tracking-widest opacity-30">
            Encryption Enabled • Worldwide Shipping • Secure Hand-off
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default WhyChoose;