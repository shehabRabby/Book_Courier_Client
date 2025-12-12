import React from "react";
import {
  AcademicCapIcon,
  TruckIcon,
  UsersIcon,
  GlobeAltIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowPathIcon,
  HeartIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const AboutUs = () => {
  // --- Enhanced Design Tokens ---
  const ACCENT_TEXT = "text-[#ff0077]";
  const ACCENT_BG = "bg-[#ff0077]";
  const ACCENT_BORDER = "border-[#ff0077]";
  const ACCENT_SHADOW = "hover:shadow-[#ff0077]/20";

  const coreValues = [
    { icon: <TruckIcon className="w-8 h-8" />, title: "Seamless Logistics", description: "Efficient, tracked delivery and pickup, ensuring books reach you safely and on time." },
    { icon: <AcademicCapIcon className="w-8 h-8" />, title: "Unrestricted Access", description: "Eliminating physical barriers so researchers and students can focus purely on learning." },
    { icon: <UsersIcon className="w-8 h-8" />, title: "Community Focused", description: "Building stronger bonds between libraries and their local reading communities." },
    { icon: <HeartIcon className="w-8 h-8" />, title: "User Delight", description: "Designing every feature—from ordering to payment—for maximum convenience and joy." },
  ];

  const timelineSteps = [
    { year: "2022", title: "Conceptualization", text: "Identified the gap in last-mile library delivery services." },
    { year: "2023", title: "Pilot Program", text: "Successful testing across 3 major metropolitan library branches." },
    { year: "2024", title: "Platform Scaling", text: "Implemented Admin/Librarian dashboards and robust security measures." },
    { year: "2025", title: "National Expansion", text: "Targeting nationwide coverage and integrated payment gateways." },
  ];

  const technicalFeatures = [
    { icon: <ShieldCheckIcon className="w-10 h-10" />, title: "Credential Fortification", details: "MongoDB and Firebase secrets are rigorously protected using DOTENV, preventing source code exposure.", span: "md:col-span-1" },
    { icon: <RocketLaunchIcon className="w-10 h-10" />, title: "High-Performance Architecture", details: "Optimized data fetching via TanStack Query ensures a lightning-fast experience across dashboards.", span: "md:col-span-1" },
    { icon: <CloudArrowUpIcon className="w-10 h-10" />, title: "Seamless Deployment", details: "CORS-compliant server logic and deployment checks ensure zero 404/504 errors for 99.9% uptime.", span: "md:col-span-1" },
    { icon: <UsersIcon className="w-10 h-10" />, title: "RBAC & JWT Security", details: "User and Admin dashboards utilize Firebase JWT verification to secure private routes and authority.", span: "md:col-span-2" },
    { icon: <SparklesIcon className="w-10 h-10" />, title: "Modern UI/UX", details: "A mobile-first, clean design approach ensures an intuitive experience free from clutter.", span: "md:col-span-1" },
  ];

  return (
    <main className="bg-base-200 text-base-content selection:bg-[#ff0077] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* --- Section 1: Hero --- */}
        <header className="text-center mb-20">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-base-content via-[#ff0077] to-base-content bg-clip-text text-transparent animate-gradient-x">
            BookCourier: Knowledge, Unbarred.
          </h1>
          <p className="max-w-2xl mx-auto text-xl opacity-80 leading-relaxed">
            We are transforming the library experience from a physical journey to a digital request. 
            <span className="font-bold text-base-content block mt-2">Your books, delivered and returned with unmatched convenience.</span>
          </p>
        </header>

        {/* --- Section 2: Values --- */}
        <section className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <article key={i} className={`p-8 rounded-2xl bg-base-100 border border-base-300 transition-all duration-300 hover:-translate-y-2 hover:border-[#ff0077] shadow-sm ${ACCENT_SHADOW}`}>
                <div className={`mb-4 ${ACCENT_TEXT}`}>{value.icon}</div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Section 3: How it Works (Visual Diagram) --- */}
        
        <section className="my-24 p-12 rounded-[3rem] bg-base-300 border border-base-content/10 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 ${ACCENT_BG} blur-[120px] opacity-10 rounded-full`}></div>
            <div className="text-center mb-12 relative z-10">
                <h2 className={`text-4xl font-black mb-4 ${ACCENT_TEXT}`}>The Magic of BookCourier</h2>
                <p className="opacity-70">A seamless bridge between the shelf and your doorstep.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                {[
                    { icon: <BookOpenIcon/>, label: "1. Request", desc: "Browse and order via our platform" },
                    { icon: <TruckIcon/>, label: "2. Deliver", desc: "Librarians ship; we handle the rest" },
                    { icon: <UsersIcon/>, label: "3. Enjoy", desc: "Start reading immediately" }
                ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center group">
                        <div className={`w-20 h-20 rounded-2xl ${ACCENT_BG} flex items-center justify-center text-white mb-4 shadow-xl transition-transform group-hover:rotate-12`}>
                            {React.cloneElement(step.icon, { className: "w-10 h-10" })}
                        </div>
                        <h4 className="font-bold text-xl">{step.label}</h4>
                        <p className="text-sm opacity-60 mt-1">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* --- Section 4: Technical Grid --- */}
        <section className="py-20">
          <h2 className="text-4xl font-black text-center mb-16">Technical Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalFeatures.map((f, i) => (
              <div key={i} className={`${f.span} p-8 rounded-3xl bg-base-100 border border-base-300 hover:border-[#ff0077]/50 transition-all group`}>
                <div className={`${ACCENT_TEXT} mb-4 transition-transform group-hover:scale-110 duration-500`}>{f.icon}</div>
                <h4 className="text-xl font-bold mb-3">{f.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{f.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 5: CTA --- */}
        <footer className="text-center py-20 bg-base-100 rounded-[4rem] border border-base-300 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-4xl font-black mb-6">Ready to start reading?</h2>
                <p className="mb-10 opacity-70 max-w-lg mx-auto">Join thousands of readers and researchers who have streamlined their library experience.</p>
                <a href="/register" className={`${ACCENT_BG} text-white px-12 py-5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-[#ff0077]/30 inline-block`}>
                    Get Started for Free
                </a>
            </div>
        </footer>
      </div>
    </main>
  );
};

export default AboutUs;