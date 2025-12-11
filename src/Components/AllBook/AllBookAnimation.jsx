import React from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaFeatherAlt,
  FaStar,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa";


const accentPrimary = "#1e3a8a"; 
const accentSecondary = "#00bfff";
const prominentColor = "#ff0077"; 
const backgroundRGBA = "rgba(235, 245, 255, 0.85)";

const AllBookAnimation = () => {
  const marqueePhrase = (
    <>
      <span
        className="inline-flex items-center"
        style={{ color: accentPrimary }}
      >
        <FaBookOpen
          className="inline-block mx-2 text-2xl"
          style={{ color: accentSecondary }}
        />
        EXPLORE THE LIBRARY
      </span>
      <FaChevronRight
        className="inline-block mx-4 text-xl"
        style={{ color: prominentColor }}
      />
      <span
        className="inline-flex items-center"
        style={{ color: accentPrimary }}
      >
        <FaFeatherAlt
          className="inline-block mx-2 text-2xl"
          style={{ color: accentSecondary }}
        />
        NEW TITLES ADDED DAILY
      </span>
      <FaChevronRight
        className="inline-block mx-4 text-xl"
        style={{ color: prominentColor }}
      />
      <span
        className="inline-flex items-center"
        style={{ color: accentPrimary }}
      >
        <FaStar
          className="inline-block mx-2 text-2xl"
          style={{ color: accentSecondary }}
        />
        FIND YOUR NEXT READ
      </span>
      <FaChevronRight
        className="inline-block mx-4 text-xl"
        style={{ color: prominentColor }}
      />
    </>
  );

  return (
    <motion.div
      className="shadow-xl overflow-hidden py-4 border-b-4"
      style={{
        borderColor: prominentColor,
        backgroundColor: backgroundRGBA,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
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
              duration: 80,
              ease: "linear",
            },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="text-4xl font-extrabold uppercase mx-8 inline-flex items-center tracking-wider"
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
