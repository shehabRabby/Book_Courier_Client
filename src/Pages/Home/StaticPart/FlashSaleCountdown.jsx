import React, { useState, useEffect } from 'react';
// Assuming you are using IoIcons from react-icons
import { IoRocketOutline, IoGiftOutline } from 'react-icons/io5'; 
import { Link } from 'react-router';

// --- Countdown Logic ---
const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return timeLeft;
};

// Set a target date (e.g., 3 days from now for a fixed offer, or calculate dynamically)
// For this example, let's set it to tomorrow morning.
const targetTime = new Date();
targetTime.setDate(targetTime.getDate() + 1); // Set target time to 24 hours from now
const fixedTargetDate = targetTime.toISOString();


const FlashSaleCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(fixedTargetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(fixedTargetDate));
    }, 1000);

    // Clears the interval when the component unmounts
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((unit) => {
    if (!unit) {
      return null;
    }
    return (
      <div key={unit} className="flex flex-col items-center bg-base-300 p-3 rounded-lg shadow-inner w-20 md:w-24 mx-1 transition duration-500 ease-in-out transform hover:scale-105">
        <span className="countdown font-mono text-4xl text-neutral">
          {timeLeft[unit] < 10 ? `0${timeLeft[unit]}` : timeLeft[unit]}
        </span>
        <span className="text-sm font-semibold mt-1 text-base-content uppercase opacity-80">{unit}</span>
      </div>
    );
  });

  return (
    <section id="flash-sale" className="py-20 md:py-32 bg-neutral text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          
          <div className="badge badge-lg badge-secondary text-base-100 mb-4 font-bold tracking-widest p-3 shadow-xl flex items-center justify-center mx-auto transition duration-300 hover:scale-105">
            <IoRocketOutline className="w-5 h-5 mr-2" />
            FLASH SALE ALERT!
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-secondary-content">
            25% OFF ALL Bestsellers
          </h2>
          <p className="mt-4 text-xl md:text-2xl font-light text-secondary-content opacity-90 max-w-3xl mx-auto">
            Limited stock and only available for the next:
          </p>
        </div>

        {/* --- Countdown Timer --- */}
        <div className="flex justify-center mt-10 space-x-2 md:space-x-4">
          {timerComponents.length ? timerComponents : <p className="text-2xl text-warning">Offer Expired!</p>}
        </div>

        {/* --- Call to Action --- */}
        <div className="text-center mt-12">
          <Link 
            href="/collections/flash-sale" 
            className="btn btn-lg btn-secondary shadow-2xl hover:shadow-primary/50 transition duration-300 transform hover:scale-[1.03] group"
          >
            <IoGiftOutline className="w-6 h-6 mr-2 transition-transform group-hover:rotate-6" />
            Shop The Flash Sale Now
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default FlashSaleCountdown;