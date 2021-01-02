import React, { useState, useEffect } from "react";

import "../CSS/RemainingRequests.css";

const RemainingRequests = () => {
  const [remainingRequests, setRemainingRequests] = useState(null);
  const [resetTime, setResetTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/rate_limit")
      .then((response) => response.json())
      .then((data) => {
        setResetTime(data.rate.reset);
      });
  }, []);
  useEffect(() => {
    fetch("https://api.github.com/rate_limit")
      .then((response) => response.json())
      .then((data) => {
        setRemainingRequests(data.rate.remaining);
      });
  }, [remainingTime, remainingRequests]);
  useEffect(() => {
    let d = new Date(0);
    d.setUTCSeconds(resetTime);
    setInterval(() => {
      if (resetTime)
        setRemainingTime(new Date(d - new Date()).toISOString().substr(14, 5));
    }, 1000);
  }, [showRequests, resetTime]);
  useEffect(() => {
    if (showRequests)
      document.getElementById("remainingRequests").classList.add("expanded");
    else
      document.getElementById("remainingRequests").classList.remove("expanded");
  }, [showRequests]);
  return (
    <div className="remainingRequests-container" id="remainingRequests">
      <div className="requests">
        <h2 className="requestNumber">{remainingRequests}</h2>
        {showRequests ? (
          <p className="remainingTime">Renew in {remainingTime}</p>
        ) : null}
      </div>
      <div
        onClick={() => setShowRequests(!showRequests)}
        className="requests-container"
      >
        <p className={`${remainingRequests!==0 ? "p-requests" : "p-requests red"}`}>Requests</p>
      </div>
    </div>
  );
};
export default RemainingRequests;