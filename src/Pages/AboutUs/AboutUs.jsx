import React from 'react';
import {
    MapPinIcon,
    AcademicCapIcon,
    TruckIcon,
    UsersIcon,
    GlobeAltIcon,
    BookOpenIcon,
    HandRaisedIcon,
    SparklesIcon,
    ArrowPathIcon,
    HeartIcon,
    ShieldCheckIcon, // New icon for Security
    CloudArrowUpIcon, // New icon for Deployment
    RocketLaunchIcon // New icon for Performance
} from '@heroicons/react/24/outline';

const AboutUs = () => {
    // --- Custom Accent Color Mapping for #ff0077 (Electric Pink) ---
    const ACCENT_COLOR_CLASS = "text-pink-600 dark:text-pink-400";
    const ACCENT_BG_OPAQUE = "bg-pink-600";
    const ACCENT_BG_LIGHT_OPACITY = "bg-pink-100 dark:bg-pink-900";
    const ACCENT_HOVER_BTN = "hover:bg-pink-700 hover:shadow-lg focus:ring-pink-500";

    const coreValues = [
        // ... (Core Values remain the same)
        {
            icon: <TruckIcon className="w-8 h-8" />,
            title: "Seamless Logistics",
            description: "Efficient, tracked delivery and pickup, ensuring books reach you safely and on time."
        },
        {
            icon: <AcademicCapIcon className="w-8 h-8" />,
            title: "Unrestricted Access",
            description: "Eliminating physical barriers so researchers and students can focus purely on learning."
        },
        {
            icon: <UsersIcon className="w-8 h-8" />,
            title: "Community Focused",
            description: "Building stronger bonds between libraries and their local reading communities."
        },
        {
            icon: <HeartIcon className="w-8 h-8" />,
            title: "User Delight",
            description: "Designing every feature—from ordering to payment—for maximum convenience and joy."
        }
    ];

    const timelineSteps = [
        // ... (Timeline Steps remain the same)
        { year: '2022', title: 'Conceptualization', text: 'Identified the gap in last-mile library delivery services.' },
        { year: '2023', title: 'Pilot Program Launch', text: 'Successful testing across 3 major metropolitan library branches.' },
        { year: '2024', title: 'Platform Scaling', text: 'Implemented Admin/Librarian dashboards and robust security measures.' },
        { year: '2025', title: 'National Expansion', text: 'Targeting coverage across all major regions, integrating payment gateways.' },
    ];

    // --- Data for the new complex grid section ---
    const technicalFeatures = [
        { 
            icon: <ShieldCheckIcon className="w-10 h-10" />,
            title: 'Credential Fortification',
            details: 'MongoDB and Firebase secrets are rigorously protected using Node.js Environment Variables (DOTENV), preventing exposure in the source code.',
            span: 'col-span-1',
            bg: 'bg-white dark:bg-gray-800'
        },
        { 
            icon: <RocketLaunchIcon className="w-10 h-10" />,
            title: 'High-Performance Architecture',
            details: 'Optimized data fetching and state management (optional: TanStack Query) ensures a lightning-fast, smooth user experience across all dashboards.',
            span: 'col-span-1',
            bg: ACCENT_BG_LIGHT_OPACITY 
        },
        { 
            icon: <CloudArrowUpIcon className="w-10 h-10" />,
            title: 'Seamless Production Deployment',
            details: 'Server logic is strictly CORS-compliant and deployment checks ensure zero 404/504 errors, maintaining robust uptime and reliability.',
            span: 'col-span-1',
            bg: 'bg-white dark:bg-gray-800'
        },
        { 
            icon: <UsersIcon className="w-10 h-10" />,
            title: 'Role-Based Access Control (RBAC)',
            details: 'User, Librarian, and Admin dashboards utilize Firebase JWT verification to secure private routes, ensuring proper authority for every action.',
            span: 'col-span-2 md:col-span-2', // Wider card
            bg: ACCENT_BG_LIGHT_OPACITY 
        },
        { 
            icon: <SparklesIcon className="w-10 h-10" />,
            title: 'Modern UI/UX Principles',
            details: 'Clean alignment, pleasing color contrast, and mobile-first design ensure an intuitive and delightful experience, avoiding “gobindo” design flaws.',
            span: 'col-span-1',
            bg: 'bg-white dark:bg-gray-800'
        }
    ];


    return (
        <div className="py-12 sm:py-20 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section 1: Hero/Introduction */}
                <header className="text-center mb-16">
                    <h1 className={`text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 ${ACCENT_COLOR_CLASS} transition duration-500 hover:scale-[1.02]`}>
                        BookCourier: Knowledge, Unbarred.
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                        We are transforming the library experience from a physical journey to a digital request. Your books, delivered and returned with **unmatched convenience**.
                    </p>
                </header>
                
                <hr className="my-12 border-gray-200 dark:border-gray-700" />

                {/* Section 2: Mission & Vision */}
                <section className={`mt-16 mb-16 p-8 rounded-3xl shadow-2xl ${ACCENT_BG_LIGHT_OPACITY} border border-pink-200 dark:border-pink-800`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-4">
                            <div className={`flex items-center mb-4 ${ACCENT_COLOR_CLASS}`}>
                                <BookOpenIcon className="w-10 h-10 mr-3 animate-pulse" />
                                <h3 className="text-3xl font-bold">Our Mission</h3>
                            </div>
                            <p className="text-lg text-gray-800 dark:text-gray-200">
                                To establish the **BookCourier** platform as the trusted logistics layer for libraries, ensuring every citizen has equitable, effortless access to educational and cultural resources, regardless of their mobility or schedule.
                            </p>
                        </div>
                        
                        <div className="p-4 border-l border-pink-300 dark:border-pink-700 md:pl-8">
                            <div className={`flex items-center mb-4 ${ACCENT_COLOR_CLASS}`}>
                                <GlobeAltIcon className="w-10 h-10 mr-3" />
                                <h3 className="text-3xl font-bold">Our Vision</h3>
                            </div>
                            <p className="text-lg text-gray-800 dark:text-gray-200">
                                To foster a new era of reading where the pursuit of knowledge is never hindered by distance, establishing a seamless, sustainable, and nationwide network for literary exchange.
                            </p>
                        </div>
                    </div>
                </section>
                
                <hr className="my-12 border-gray-200 dark:border-gray-700" />

                {/* Section 3: Core Values (Hover Effects) */}
                <section className="text-center py-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {coreValues.map((value, index) => (
                            <div 
                                key={index} 
                                className="p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 
                                           transition duration-300 transform hover:shadow-xl hover:scale-105 hover:border-pink-600"
                            >
                                <div className={`mx-auto mb-4 ${ACCENT_COLOR_CLASS}`}>
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="my-12 border-gray-200 dark:border-gray-700" />
                
                {/* Section 4: Animated Section - How It Works */}
                <section className={`py-16 my-16 rounded-xl shadow-2xl ${ACCENT_BG_LIGHT_OPACITY} border border-pink-200 dark:border-pink-800`}>
                    <div className="text-center">
                        <h2 className={`text-4xl font-bold mb-4 text-gray-900 dark:text-white ${ACCENT_COLOR_CLASS}`}>
                            <SparklesIcon className="w-8 h-8 inline mr-2 animate-bounce" />
                            The Magic of BookCourier
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
                            See our three-step process in action.
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 text-center">
                        {/* Step 1 */}
                        <div className="md:w-1/3 p-4">
                            <div className={`p-4 mx-auto w-16 h-16 rounded-full ${ACCENT_BG_OPAQUE} flex items-center justify-center text-white mb-4 transition duration-500 hover:rotate-6`}>
                                <BookOpenIcon className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">1. Request</h4>
                            <p className="text-gray-600 dark:text-gray-400">User places an order on the platform.</p>
                        </div>
                        
                        {/* Arrow/Separator */}
                        <ArrowPathIcon className={`hidden md:block w-10 h-10 ${ACCENT_COLOR_CLASS} transform rotate-90 md:rotate-0`} />
                        
                        {/* Step 2 */}
                        <div className="md:w-1/3 p-4">
                            <div className={`p-4 mx-auto w-16 h-16 rounded-full ${ACCENT_BG_OPAQUE} flex items-center justify-center text-white mb-4 transition duration-500 hover:-translate-y-2`}>
                                <TruckIcon className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">2. Ship/Deliver</h4>
                            <p className="text-gray-600 dark:text-gray-400">Librarian ships; we handle the delivery.</p>
                        </div>
                        
                        {/* Arrow/Separator */}
                        <ArrowPathIcon className={`hidden md:block w-10 h-10 ${ACCENT_COLOR_CLASS} transform rotate-90 md:rotate-0`} />

                        {/* Step 3 */}
                        <div className="md:w-1/3 p-4">
                            <div className={`p-4 mx-auto w-16 h-16 rounded-full ${ACCENT_BG_OPAQUE} flex items-center justify-center text-white mb-4 transition duration-500 hover:scale-110`}>
                                <UsersIcon className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">3. Enjoy</h4>
                            <p className="text-gray-600 dark:text-gray-400">You receive the book and start reading!</p>
                        </div>
                    </div>
                </section>

                <hr className="my-12 border-gray-200 dark:border-gray-700" />
                
                {/* Section 5: Our History/Timeline */}
                <section className="py-16">
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
                        Our Journey So Far
                    </h2>
                    <div className="relative">
                        {/* Timeline Connector Line */}
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${ACCENT_BG_OPAQUE} hidden md:block`}></div>
                        
                        {timelineSteps.map((step, index) => (
                            <div key={index} className="mb-8 flex justify-between items-center w-full right-timeline">
                                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:order-2'}`}>
                                    <div className={`p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition duration-300 hover:shadow-2xl hover:border-pink-500`}>
                                        <h3 className={`text-2xl font-bold mb-1 ${ACCENT_COLOR_CLASS}`}>{step.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.text}</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex w-2/12 justify-center items-center">
                                    {/* Timeline Dot */}
                                    <div className={`w-8 h-8 rounded-full ${ACCENT_BG_OPAQUE} z-10 flex items-center justify-center text-white font-bold border-4 border-white dark:border-gray-900`}>
                                        {step.year.slice(2)}
                                    </div>
                                </div>
                                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'hidden md:block'}`}></div>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="my-12 border-gray-200 dark:border-gray-700" />

                {/* Section 6: Security and Technology - COMPLEX GRID */}
                <section className="py-16 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Technical Excellence: Secure & Production-Ready
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-10">
                        Our architecture is built upon core principles of modern development: **security, scalability, and clean code**.
                    </p>
                    
                    {/* The complex grid layout: 5 items in a custom 3-column flow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
                        {technicalFeatures.map((feature, index) => (
                            <div 
                                key={index} 
                                // Apply dynamic column span based on feature data
                                className={`${feature.span} ${feature.bg} p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transition duration-500 transform hover:scale-[1.03] hover:shadow-pink-500/50 text-left`}
                            >
                                <div className={`flex items-center mb-3 ${ACCENT_COLOR_CLASS}`}>
                                    {feature.icon}
                                    <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">{feature.title}</h4>
                                </div>
                                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                                    {feature.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="my-12 border-gray-200 dark:border-gray-700" />

                {/* Section 7: Final Call to Action */}
                <section className="text-center pt-8 pb-4">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Explore the Future of Library Services
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Ready to see the difference a dedicated delivery management system makes?
                    </p>
                    <a 
                        href="/register" 
                        className={`inline-flex items-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-2xl text-white ${ACCENT_BG_OPAQUE} ${ACCENT_HOVER_BTN} focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 transform hover:scale-105`}
                    >
                        Start Your Free Account Today
                    </a>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;