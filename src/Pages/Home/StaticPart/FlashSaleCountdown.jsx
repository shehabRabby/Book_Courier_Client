import React, { useState, useEffect, useMemo } from "react";
import { IoGiftOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const FlashSaleCountdown = () => {
  const shelfLife = useMemo(() => {
    const end = new Date();
    end.setHours(end.getHours() + 24);
    return end.getTime();
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const ticker = setInterval(() => {
      const now = new Date().getTime();
      const distance = shelfLife - now;

      if (distance < 0) {
        clearInterval(ticker);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(ticker);
  }, [shelfLife]);

  if (!timeLeft) {
    return (
      <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <h2 className="text-3xl font-extrabold text-zinc-400 uppercase tracking-widest">
          Protocol Concluded
        </h2>
      </div>
    );
  }

  return (
    <section className="py-24  dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative overflow-hidden border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-sky-500 dark:text-emerald-500">
            Live Archive Protocol Active
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-14 text-primary dark:text-white">
          Exclusive{" "}
          <span className="text-primary dark:text-indigo-400">
            25% Discount
          </span>{" "}
          Expires In:
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-24 h-28 md:w-32 md:h-36 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center shadow-xl dark:shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] dark:from-white/[0.03] to-transparent pointer-events-none" />

                <span className="text-4xl md:text-6xl font-black font-mono tabular-nums text-indigo-600 dark:text-white tracking-tighter">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {unit}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Link
            to="/all-books"
            className="group inline-flex items-center px-12 py-5 bg-indigo-600 text-white font-bold text-sm uppercase rounded-2xl transition-all duration-300 transform hover:translate-y-[-4px] hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 active:scale-95"
          >
            <IoGiftOutline className="text-xl mr-3" />
            Claim Archive Access
          </Link>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            * Limited to authorized accounts during current sync window
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleCountdown;