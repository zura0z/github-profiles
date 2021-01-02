import React, { useState, useEffect } from "react";

import "../CSS/Toggle.css";

import lightListIcon from "../CSS/Icons/lightListIcon.png";
import lightGridIcon from "../CSS/Icons/lightGridIcon.png";

const Toggle = ({ selectedView }) => {
  const [view, setView] = useState("list");

  const toggleView = (e) => {
    setView(e.target.id);
    e.target.id === "grid"
      ? document.getElementById("toggleSelected").classList.add("gridSelected")
      : document
          .getElementById("toggleSelected")
          .classList.remove("gridSelected");
  };
  useEffect(() => {
    selectedView(view);
  }, [view, selectedView]);

  return (
    <div className="toggle-container">
      <div className="toggle-selected" id="toggleSelected" />
      <img
        onClick={toggleView}
        id="list"
        className="toggleBtn"
        src={lightListIcon}
        alt="lightListIcon"
      />
      <img
        onClick={toggleView}
        id="grid"
        className="toggleBtn"
        src={lightGridIcon}
        alt="lightGridIcon"
      />
    </div>
  );
};

export default Toggle;
