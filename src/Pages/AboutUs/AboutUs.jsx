import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

// Components
import { Link } from "react-router"; // Fixed import path if using react-router-dom
import HowItWorks from "../../Components/Aboutus/HowItWorks";
import MarqueeWorkflow from "../../Components/Aboutus/MarqueeWorkflow";

// Assets
import banner3 from "../../assets/new4.jpg";
import TechStackGrid from "../../Components/Aboutus/TechStackGrid";
import AboutFooter from "../../Components/Aboutus/AboutFooter";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP: Smooth Reveal for Text Sections
    const revealElements = gsap.utils.toArray(".reveal-up");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <main
      ref={containerRef}
      className="bg-base-100 text-base-content overflow-hidden transition-colors duration-300"
    >
      {/* --- Section 1: Hero Section --- */}
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center px-4 overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <img
            src={banner3}
            className="w-full h-full object-cover opacity-20 dark:opacity-40 grayscale-[40%]"
            alt="Library Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-100/50 to-base-100" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic mb-6">
              Moving{" "}
              <span className="text-primary italic font-serif lowercase">
                the
              </span>{" "}
              <br /> Mind.
            </h1>
            <p className="text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed font-medium">
              BookCourier bridges the gap between static library shelves and the
              dynamic needs of modern researchers.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/explore"
                className="btn btn-primary btn-md px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
              >
                Explore Maps
              </Link>
              <Link
                to="/story"
                className="btn btn-outline btn-md px-8 rounded-xl font-bold uppercase tracking-wider text-xs"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 2: Real-World Impact --- */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-base-content/5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
              Knowledge shouldn't <br /> have a distance.
            </h2>
            <p className="text-base opacity-60 leading-relaxed mb-8">
              Every month, thousands of books stay unread simply because of
              travel constraints. We turned that idle knowledge into a fluid
              network of delivery.
            </p>
            <div className="grid grid-cols-2 gap-8 py-6 border-t border-base-content/10">
              <div>
                <h4 className="text-3xl font-black text-primary">25k+</h4>
                <p className="text-[10px] uppercase font-bold opacity-40 mt-1">
                  Borrows Managed
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-primary">150+</h4>
                <p className="text-[10px] uppercase font-bold opacity-40 mt-1">
                  Active Couriers
                </p>
              </div>
            </div>
          </div>
          <div className="reveal-up delay-100 relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl transition-all" />
            <img
              src={banner3}
              className="relative z-10 rounded-[2rem] border border-base-content/5 shadow-xl hover:scale-[1.02] transition-transform duration-500"
              alt="Impact"
            />
          </div>
        </div>
      </section>

      <HowItWorks />
      <MarqueeWorkflow />
      <TechStackGrid></TechStackGrid>
      <AboutFooter></AboutFooter>
    </main>
  );
};

export default AboutUs;
