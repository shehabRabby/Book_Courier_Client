import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  ArrowRightIcon, 
  ClipboardDocumentCheckIcon, 
  MapPinIcon, 
  SparklesIcon 
} from "@heroicons/react/24/outline";

// Assets import (Assuming these images exist in your assets folder)
import banner1 from "../../assets/banner3.png"; 
import banner2 from "../../assets/banner4.jpg"; 
import banner3 from "../../assets/banner5.jpg"; 
import { Link } from "react-router";
// Agar sirf 3 images hain, to aap steps array me accordingly adjust kar sakte hain.

const HowItWorks = () => {
  const scrollContainerRef = useRef(null);
  const marqueeTl = useRef(null); // Timeline for GSAP animation

  const steps = [
    {
      id: "01",
      title: "The Digital Handshake",
      description: "When you request a book, our system instantly pings the library's local database via encrypted channels.",
      icon: <SparklesIcon />,
      image: banner1 
    },
    {
      id: "02",
      title: "Smart Routing & Dispatch",
      description: "Our AI dispatcher identifies the nearest courier and generates an optimized route to save fuel and time.",
      icon: <MapPinIcon />,
      image: banner2
    },
    {
      id: "03",
      title: "Safe Handover & Track",
      description: "Every book is handled with archival care, tracked in real-time until it reaches your hands safely.",
      icon: <ClipboardDocumentCheckIcon />,
      image: banner3
    },
    // Duplicate steps to create a seamless loop effect
    { 
      id: "01", 
      title: "The Digital Handshake", 
      description: "When you request a book, our system instantly pings the library's local database via encrypted channels.", 
      icon: <SparklesIcon />, 
      image: banner1 
    },
    { 
      id: "02", 
      title: "Smart Routing & Dispatch", 
      description: "Our AI dispatcher identifies the nearest courier and generates an optimized route to save fuel and time.", 
      icon: <MapPinIcon />, 
      image: banner2 
    },
    { 
      id: "03", 
      title: "Safe Handover & Track", 
      description: "Every book is handled with archival care, tracked in real-time until it reaches your hands safely.", 
      icon: <ClipboardDocumentCheckIcon />, 
      image: banner3 
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate total width of all cards to determine scroll distance
    const cardWidth = container.querySelector('.how-it-works-card').offsetWidth;
    const numOriginalSteps = steps.length / 2; // Assuming we duplicated the steps
    const scrollDistance = cardWidth * numOriginalSteps;

    // Create GSAP timeline for infinite marquee
    marqueeTl.current = gsap.timeline({ repeat: -1, paused: false }) // Repeat infinitely
      .to(container, {
        x: -scrollDistance, // Scroll to the end of the original steps
        duration: numOriginalSteps * 6, // Adjust duration for desired speed
        ease: "none"
      })
      .set(container, { x: 0 }); // Snap back to start instantly to create loop


    // Pause on hover
    container.addEventListener('mouseenter', () => marqueeTl.current.pause());
    container.addEventListener('mouseleave', () => marqueeTl.current.play());

    return () => {
      if (marqueeTl.current) {
        marqueeTl.current.kill();
      }
      container.removeEventListener('mouseenter', () => marqueeTl.current.pause());
      container.removeEventListener('mouseleave', () => marqueeTl.current.play());
    };
  }, [steps.length]); // Re-run effect if steps change


  return (
    <section className="overflow-hidden  py-20 relative">


      <div className="relative z-10 px-4 md:px-0">
         <h3 className="text-xl md:text-3xl font-bold uppercase tracking-widest text-primary text-center mb-16">
            Seamless Process, Smarter Delivery
         </h3>
      </div>
      
      {/* Marquee Container */}
      <div className="flex flex-nowrap w-full" ref={scrollContainerRef}>
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="how-it-works-card flex-shrink-0 w-full md:w-[calc(100vw/2.5)] lg:w-[calc(100vw/3)] xl:w-[calc(100vw/4)] p-4" // Responsive width
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-base-content/10 bg-base-100 shadow-xl h-full flex flex-col group hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-48 md:h-64 object-cover object-center grayscale-[60%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <div className="w-8 h-8 p-1 bg-primary/10 rounded-lg flex items-center justify-center">
                       {React.cloneElement(step.icon, { className: "w-5 h-5" })}
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">{step.id}. {step.title}</span>
                  </div>
                  <p className="text-base opacity-70 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>
                <Link to="/all-books" className="btn btn-sm btn-primary btn-outline rounded-full group-hover:btn-primary text-xs w-fit">
                  Explore <ArrowRightIcon className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;