import React from "react";
import { SkewLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

// Component name remains Loading
const Loading = ({ loading = true, color = "#ffeb3b", size = 30 }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        // Semi-transparent dark overlay for cinematic feel
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <SkewLoader
        color={color} // Bright yellow/gold color for high contrast
        loading={loading}
        cssOverride={override}
        size={50} // A good size for the skew animation
        aria-label="Skew Loader"
      />
      {/* Adding a dynamic-looking status message */}
      <p
        style={{
          marginTop: "40px",
          color: "#fff",
          fontFamily: "monospace", // Use a monospaced font for a "code loading" feel
          fontSize: "1.1em",
          textShadow: "0 0 5px #ff0077", // Subtle glow effect to match the loader
        }}
      >
        Initiating sequence...
      </p>
    </div>
  );
};

export default Loading;
