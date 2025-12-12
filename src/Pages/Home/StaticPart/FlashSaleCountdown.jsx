import React, { useState, useEffect, useMemo } from 'react';
import { IoRocketOutline, IoGiftOutline, IoFlash } from 'react-icons/io5'; 
import { Link } from 'react-router-dom';

const FlashSaleCountdown = () => {
  // 1. STABILIZE THE TARGET DATE
  // We use useMemo so the end time doesn't reset every time the component updates.
  // This sets the deadline to exactly 24 hours from when the user first loads the page.
  const shelfLife = useMemo(() => {
    const end = new Date();
    end.setHours(end.getHours() + 24); 
    return end.getTime();
  }, []);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 2. THE RUNNING ENGINE
  useEffect(() => {
    const ticker = setInterval(() => {
      const now = new Date().getTime();
      const distance = shelfLife - now;

      if (distance < 0) {
        clearInterval(ticker);
        setTimeLeft(null); // Timer finished
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(ticker); // Stop the clock if the user leaves the page
  }, [shelfLife]);

  if (!timeLeft) {
    return (
      <div className="text-center p-20 bg-base-300">
        <h2 className="text-3xl font-black text-error">OFFER EXPIRED</h2>
      </div>
    );
  }

  

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Active Status Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0077] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff0077]"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-[0.4em] animate-pulse">
            Live Flash Protocol Active
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
          HURRY! <span className="text-[#ff0077]">25% OFF</span> ENDS IN:
        </h2>

        {/* --- The Ticking Grid --- */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-24 h-28 md:w-32 md:h-36 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl md:text-6xl font-black font-mono tabular-nums text-white">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40">{unit}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link 
            to="/all-books" 
            className="btn btn-lg h-16 px-12 rounded-full border-none text-white font-black uppercase tracking-widest shadow-[0_0_40px_rgba(255,0,119,0.3)] hover:scale-105 transition-all"
            style={{ backgroundColor: '#ff0077' }}
          >
            <IoGiftOutline className="text-2xl mr-2" />
            Claim Discount Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleCountdown;