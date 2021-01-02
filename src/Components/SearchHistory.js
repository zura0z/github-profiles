import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LightUserIcon from "../CSS/Icons/lightUserIcon.png";
import NewTabIcon from "../CSS/Icons/newTabIcon.png";

import "../CSS/SearchHistory.css";

const SearchHistory = ({ history }) => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    if (history) setArr(history);
  }, [history]);

  return (
    <div className="nav-search-history">
      {Array.isArray(arr)
        ? arr
            .slice(0)
            .reverse()
            .map((user) => (
              <div
                key={user}
                onMouseDown={(e) => e.preventDefault()}
                className="searchHistory-container"
              >
                <Link
                  to={`/${user}`}
                  className="searchHistory-mainLink"
                  rel="noopener noreferrer"
                >
                  <div className="searchHistory-user-container">
                    <img
                      src={LightUserIcon}
                      alt="userIcon"
                      className="searchHistory-userIcon"
                    />
                    <p>{user}</p>
                  </div>
                </Link>
                <Link
                  to={`/${user}`}
                  className="searchHistory-jumpTo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p>Jump to</p>
                  <img src={NewTabIcon} alt="newTabIcon" className="searchHistory-jumpTo-icon"/>
                </Link>
              </div>
            ))
        : null}
    </div>
  );
};

export default SearchHistory;
