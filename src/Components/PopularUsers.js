import React, { useState, useEffect } from "react";
import axios from "axios";

import UserCard from "./UserCard";
import UserRow from "./UserRow";
import Loader from "./Loader";

import PrevIcon from "../CSS/Icons/prevIcon.png";
import NextIcon from "../CSS/Icons/nextIcon.png";

import "../CSS/PopularUsers.css";

const PopularUsers = ({ view }) => {
  const [userArray, setUserArray] = useState([]);
  const [arrayPart, setArrayPart] = useState(0);
  const [repos, setRepos] = useState([]);
  const [allRepos, setAllRepos] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(null);
  const [page, setPage] = useState(1);

  const chunkArray = (arr, n) => {
    var chunkLength = Math.max(arr.length / n, 1);
    var chunks = [];
    for (var i = 0; i < n; i++) {
      if (chunkLength * (i + 1) <= arr.length)
        chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
    }
    return chunks;
  };
  const pageUp = () => {
    if (arrayPart === 1) {
      setPage(page + 1);
      setArrayPart(0);
      window.scrollTo(0, 0);
    } else {
      setArrayPart(1);
      window.scrollTo(0, 0);
    }
  };
  const pageDown = () => {
    if (arrayPart === 0 && page !== 1) {
      setPage(page - 1);
      setArrayPart(1);
      window.scrollTo(0, 0);
    } else {
      setArrayPart(0);
      window.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.github.com/search/users?q=type:user&page=${page}`
      );
      setUserArray(chunkArray(result.data.items, 2));
    };
    fetchData();
    fetch("https://api.github.com/rate_limit")
      .then((response) => response.json())
      .then((data) => setRemainingRequests(data.rate.remaining));
  }, [page]);
  useEffect(() => {
    let all = [];
    if (userArray[arrayPart] && remainingRequests) {
      userArray[arrayPart].map((user) => {
        let repoArray = [];
        let repoNames = [];
        const fetchData = async () => {
          const res = await axios(user.repos_url);
          repoArray = res.data;
          for (let i = 0; i <= 2; i++) {
            if (repoArray[i]) repoNames = [...repoNames, repoArray[i].name];
          }
          repoNames = [user.login, [...repoNames]];
          if (repoNames[1]) repoNames[1] = repoNames[1].join(", ");
          else repoNames[1] = "No repositories";
          all.push(repoNames);
          all.length === userArray[arrayPart].length && remainingRequests !== 0
            ? setAllRepos(true)
            : setAllRepos(false);
          setRepos(all);
        };
        fetchData();
      });
    }
  }, [userArray, arrayPart, remainingRequests]);
  const getRepo = (userName, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === userName) return arr[i][1];
    }
  };

  return (
    <div className="popularUsers-container">
      <div
        className={`${
          view === "grid" ? "popularUsers-grid" : "popularUsers-list"
        }`}
      >
        {userArray[arrayPart] ? (
          userArray[arrayPart].map((user) => {
            if (view === "grid")
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  repos={getRepo(user.login, repos)}
                />
              );
            return (
              <UserRow
                key={user.id}
                user={user}
                repos={getRepo(user.login, repos)}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <div className="popularUsers-pageBtn-container">
        <img
          alt="prevPage"
          src={PrevIcon}
          onClick={pageDown}
          className={`${
            page === 1 && arrayPart === 0 ? "popularUsers-pageBtn-disabled" : ""
          } popularUsers-pageBtn`}
        />
        <img
          alt="nextPage"
          src={NextIcon}
          onClick={pageUp}
          className="popularUsers-pageBtn"
        />
      </div>
    </div>
  );
};

export default PopularUsers;