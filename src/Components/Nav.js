import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import searchIcon from "../CSS/Icons/searchIcon.png";
import githubIcon from "../CSS/Icons/lightGithubIcon.png";

import SearchHistory from "./SearchHistory";
import Toggle from "./Toggle";
import BackButton from "./BackButton";

import "../CSS/Nav.css";

const Nav = ({ selectedView }) => {
  const url = useLocation();
  const reactHistory = useHistory();
  const [searchedUser, setSearchedUser] = useState("");
  const [storage, setStorage] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (storage.length !== 0) localStorage.setItem(1, storage);
    if (localStorage.getItem(1)) setStorage(localStorage.getItem(1).split(","));
  }, [focus]);
  const handleChange = (e) => {
    setSearchedUser(e.target.value.trim());
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && searchedUser) {
      let user = searchedUser;
      submitSearch();
      setSearchedUser("");
      reactHistory.push(`/${user}`);
    }
  };
  const submitSearch = () => {
    if (storage.length >= 3 && Array.isArray(storage) && searchedUser)
      setStorage(storage.shift());
    if (!storage.includes(searchedUser) && searchedUser) {
      setStorage([...storage, searchedUser]);
    }
    localStorage.setItem(1, storage);
    setFocus(false);
  };
  useEffect(() => {
    setFocus(false);
    setSearchedUser("");
  }, [url]);

  return (
    <div className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-homeLink">
          <img src={githubIcon} alt="githubIcon" className="nav-githubIcon" />
        </Link>
        <div className="nav-search-container">
          <input
            onClick={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={handleChange}
            onKeyDown={handleEnter}
            value={searchedUser}
            className="nav-searchInput"
            type="text"
            placeholder="Search"
          />
          {focus && storage[0] ? <SearchHistory history={storage} /> : null}
          <Link
            to={searchedUser ? `/${searchedUser}` : "#"}
            className="nav-searchBtn"
            onClick={submitSearch}
          >
            <img className="nav-searchIcon" src={searchIcon} alt="searchIcon" />
          </Link>
        </div>
        {url.pathname === "/" ? (
          <Toggle selectedView={(view) => selectedView(view)} />
        ) : (
          <BackButton />
        )}
      </div>
    </div>
  );
};

export default Nav;
