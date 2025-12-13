import React from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaFeatherAlt,
  FaStar,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa";
const primaryDark = "#1e3a8a"; 
const accentGold = "#facc15";
const backgroundLight = "#f7f7f7";
const prominentBorder = "#b58700"; 
const backgroundRGBA = "rgba(247, 247, 247, 0.95)";
const AllBookAnimation = () => {
  const marqueePhrase = (
    <>
      <span
        className="inline-flex items-center"
        style={{ color: primaryDark }}
      >
        <FaBookOpen
          className="inline-block mx-3 text-3xl" 
          style={{ color: accentGold }}
        />
        EXPLORE THE LIBRARY
      </span>
      <FaChevronRight
        className="inline-block mx-6 text-2xl" 
        style={{ color: prominentBorder }}
      />
      <span
        className="inline-flex items-center"
        style={{ color: primaryDark }}
      >
        <FaFeatherAlt
          className="inline-block mx-3 text-3xl" 
          style={{ color: accentGold }}
        />
        NEW TITLES ADDED DAILY
      </span>
      <FaChevronRight
        className="inline-block mx-6 text-2xl"
        style={{ color: prominentBorder }}
      />

      {/* 3. FIND YOUR NEXT READ */}
      <span
        className="inline-flex items-center"
        style={{ color: primaryDark }}
      >
        <FaStar
          className="inline-block mx-3 text-3xl" 
          style={{ color: accentGold }}
        />
        FIND YOUR NEXT READ
      </span>
      <FaChevronRight
        className="inline-block mx-6 text-2xl"
        style={{ color: prominentBorder }}
      />
    </>
  );

  return (
    <motion.div
      className="shadow-2xl overflow-hidden py-4 border-b-4 border-t-2" 
      style={{
        borderColor: prominentBorder,
        backgroundColor: backgroundRGBA,
      }}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }} 
    >
      <div className="whitespace-nowrap overflow-hidden">
        {" "}
        <motion.div
          className="inline-block"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60, 
              ease: "linear",
            },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="text-5xl font-black uppercase mx-12 inline-flex items-center tracking-widest" 
            >
              {marqueePhrase}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllBookAnimation;