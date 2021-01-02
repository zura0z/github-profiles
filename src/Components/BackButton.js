import React from "react";
import { Link } from "react-router-dom";

import goBackIcon from "../CSS/Icons/goBackIcon.png";

import "../CSS/BackButton.css";

const BackButton = () => {
  return (
    <Link to="/" className="page404-link">
      <img src={goBackIcon} alt="goBackIcon" className="page404-goBackIcon" />
      <p>Go Back</p>
    </Link>
  );
};

export default BackButton;
