import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  ShieldCheckIcon,
  BoltIcon,
  AcademicCapIcon,
  MapPinIcon,
  CircleStackIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";

const MarqueeWorkflow = () => {
  const marqueeRef = useRef(null);

  const techItems = [
    { title: "Data Encryption", icon: <ShieldCheckIcon />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Neural Routing", icon: <BoltIcon />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Archival Care", icon: <AcademicCapIcon />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Real-time GPS", icon: <MapPinIcon />, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Cloud Sync", icon: <CircleStackIcon />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Biometric Auth", icon: <FingerPrintIcon />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth;

    const animation = gsap.to(marquee, {
      x: `-${scrollWidth / 2}`,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    marquee.addEventListener("mouseenter", () => animation.pause());
    marquee.addEventListener("mouseleave", () => animation.play());

    return () => animation.kill();
  }, []);

  return (
    <section className="py-20 bg-base-100 overflow-hidden border-y border-base-content/5">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
            Core <span className="text-primary font-serif lowercase">of</span> Infrastructure
          </h3>
        </div>
        <p className="text-sm opacity-50 max-w-xs font-medium border-l-2 border-primary pl-4">
          The engine that drives seamless delivery across 50+ cities.
        </p>
      </div>

      {/* Unique Pill-Shaped Marquee */}
      <div className="flex whitespace-nowrap gap-6" ref={marqueeRef}>
        {[...techItems, ...techItems].map((item, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center gap-4 px-8 py-5 rounded-full border border-base-content/5 bg-base-200/50 backdrop-blur-md hover:border-primary/40 hover:bg-base-100 transition-all duration-300 group cursor-default"
          >
            <div className={`${item.bg} ${item.color} p-3 rounded-full group-hover:scale-110 transition-transform duration-500`}>
              {React.cloneElement(item.icon, { className: "w-6 h-6" })}
            </div>
            <div>
              <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className="w-1 h-1 rounded-full bg-primary/30" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Gradient Fades */}
      <div className="relative h-0">
        <div className="absolute bottom-0 left-0 w-32 h-[120px] bg-gradient-to-r from-base-100 to-transparent z-10 -translate-y-[120px]" />
        <div className="absolute bottom-0 right-0 w-32 h-[120px] bg-gradient-to-l from-base-100 to-transparent z-10 -translate-y-[120px]" />
      </div>
    </section>
  );
};

export default MarqueeWorkflow;