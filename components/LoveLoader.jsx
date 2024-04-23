import React from "react";

const LoveLoader = () => {
  return (
    <div id="container">
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="shadowLoad"></div>
    </div>
  );
};

export default LoveLoader;
