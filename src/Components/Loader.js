import React from "react";
import ReactLoader from "react-loader-spinner";

import "../CSS/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <ReactLoader
        className="loader"
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loader;
