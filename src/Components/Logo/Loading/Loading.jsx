import React from "react";

import { SkewLoader } from "react-spinners";

const override = {
  display: "block",

  margin: "0 auto",
};

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
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <SkewLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Skew Loader"
      />

      <p
        style={{
          marginTop: "40px",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "1.1em",
          textShadow: "0 0 5px #ff0077",
        }}
      >
        Initiating sequence...
      </p>
    </div>
  );
};

export default Loading;
