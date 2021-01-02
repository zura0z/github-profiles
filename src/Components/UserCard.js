import React from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import DarkRepoIcon from "../CSS/Icons/darkRepoIcon.png";
import LightUserIcon from "../CSS/Icons/lightUserIcon.png";

import "../CSS/UserCard.css";

const UserCard = ({ user, repos }) => {
  return (
    <div className="userCard-container">
      <img className="userCard-image" src={user.avatar_url} alt={user.login} />

      <div className="userCard-info-container">
        <div className="userCard-login-container">
          <img
            className="userCard-userIcon"
            src={LightUserIcon}
            alt="userIcon"
          />
          <Link
            to={`/${user.login}`}
            className="userRow-login"
            rel="noopener noreferrer"
          >
            {user.login}
          </Link>
        </div>
        <div className="userCard-type-container">
          <p className="userCard-type">{user.type}</p>
        </div>
        <div className="userCard-repos-container">
          <img
            className="userCard-repoIcon"
            src={DarkRepoIcon}
            alt="repoIcon"
          />
          {!repos ? (
            <div className="userCard-repos">
              <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <p className="userCard-repos">{repos}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
