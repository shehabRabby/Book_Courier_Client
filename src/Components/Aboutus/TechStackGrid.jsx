import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheckIcon,
  CpuChipIcon,
  CircleStackIcon,
  GlobeAltIcon,
  LockClosedIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

// Assets
import bannerTech from "../../assets/banner6.jpg"; // Use your technical-looking asset

gsap.registerPlugin(ScrollTrigger);

const TechStackGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".tech-card");
    
    gsap.fromTo(cards, 
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const specs = [
    { icon: <ShieldCheckIcon />, title: "Auth Protocol", detail: "Firebase JWT + RBAC" },
    { icon: <CircleStackIcon />, title: "Persistence", detail: "MongoDB Aggregation" },
    { icon: <BoltIcon />, title: "Real-time", detail: "TanStack Query v5" },
    { icon: <GlobeAltIcon />, title: "Deployment", detail: "Vercel Edge Network" },
  ];

  return (
    <section ref={gridRef} className="py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary mb-2">Technical Core</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Built for <span className="text-primary italic">Scale</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual Feature - Bento Big Card */}
          <div className="lg:col-span-8 tech-card relative group rounded-[2.5rem] overflow-hidden bg-base-100 border border-base-content/5 h-[400px] md:h-[500px]">
            <img 
              src={bannerTech} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              alt="Server Room"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary rounded-2xl text-white shadow-xl">
                  <CpuChipIcon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl md:text-4xl font-bold tracking-tight">System Architecture</h4>
              </div>
              <p className="max-w-xl text-base-content/70 font-medium">
                Our infrastructure handles thousands of concurrent book requests using micro-services, ensuring 99.9% uptime for both libraries and couriers.
              </p>
            </div>
          </div>

          {/* Side Bento Cards - Grid within Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {specs.map((spec, i) => (
              <div 
                key={i} 
                className="tech-card p-8 rounded-[2rem] bg-base-100 border border-base-content/5 hover:border-primary/30 transition-all group flex items-center gap-6"
              >
                <div className="w-12 h-12 flex-shrink-0 text-primary bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  {React.cloneElement(spec.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h5 className="font-bold text-lg leading-none mb-1">{spec.title}</h5>
                  <p className="text-xs font-mono opacity-50 uppercase tracking-widest">{spec.detail}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;