import React from 'react';
// IMPORTANT: Replaced standard <a> tag with Link component from 'react-router'
import { Link } from 'react-router'; 
// Assuming you are using 'react-icons/io5' or similar for the icons
// import { IoSpeedometerOutline, IoBookmarkOutline, IoPeopleOutline } from 'react-icons/io5'; 

// --- Data for the features ---
const features = [
  {
    icon: (
        // Placeholder for IoSpeedometerOutline or similar
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.111a9.969 9.969 0 00-1.785-2.686C15.655 2.87 13.91 2 12 2s-3.655.87-4.832 2.193a9.971 9.971 0 00-1.785 2.686C4.086 7.425 3 9.477 3 12s1.086 4.575 3.383 6.111a9.97 9.97 0 001.785 2.686C8.345 21.13 10.09 22 12 22s3.655-.87 4.832-2.193a9.971 9.971 0 001.785-2.686C19.914 16.575 21 14.523 21 12s-1.086-4.575-3.382-6.111z" />
        </svg>
    ),
    title: 'Guaranteed Fast Delivery',
    description: 'We partner with the best couriers to ensure your next great read is on your doorstep in 1-3 business days, tracked all the way.',
  },
  {
    icon: (
        // Placeholder for IoBookmarkOutline or similar
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    title: 'Quality Checked Books',
    description: 'Our team hand-selects and verifies every book listing, ensuring you receive high-quality copies as described.',
  },
  {
    icon: (
        // Placeholder for IoPeopleOutline or similar
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    title: 'Community Focus',
    description: 'A portion of every purchase supports local literacy programs and independent authors in the delivery cities.',
  },
];

const WhyChoose = () => {
  return (
    <section id="why-choose" className="py-16 md:py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-pink-900  tracking-tight">
            Why Readers Choose <span className="text-secondary">Book Courier</span>
          </h2>
          <p className="mt-4 text-xl text-base-content max-w-3xl mx-auto opacity-70">
            Discover the difference in book shopping—faster delivery, curated collections, and community support.
          </p>
        </div>

        {/* --- Feature Grid --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            // DaisyUI Card Component with hover animation
            <div 
              key={index} 
              className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="card-body items-center text-center">
                
                {/* 💡 Key Change: Icon Wrapper uses secondary colors */}
                <div className="p-4 bg-secondary-content text-secondary rounded-full mb-4">
                  {/* React Icon Component goes here */}
                  {feature.icon}
                </div>
                
                <h3 className="card-title text-2xl font-bold text-neutral">
                  {feature.title}
                </h3>
                
                <p className="text-base text-black opacity-90 mt-2">
                  {feature.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>

        {/* --- Call to Action (CTA) --- */}
        <div className="text-center mt-16">
          <Link 
            to="/all-books" 
            className="btn btn-lg btn-secondary shadow-lg hover:shadow-xl transition duration-300"
          >
            Explore Our Collection
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default WhyChoose;