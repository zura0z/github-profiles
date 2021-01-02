import React from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import DarkRepoIcon from "../CSS/Icons/darkRepoIcon.png";
import LightUserIcon from "../CSS/Icons/lightUserIcon.png";

import "../CSS/UserRow.css";

const UserRow = ({ user, repos }) => {
  return (
    <div className="userRow-container">
      <img className="userRow-image" src={user.avatar_url} alt={user.login} />
      <div className="userRow-info-container">
        <div className="userRow-login-container">
          <img
            className="userRow-userIcon"
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
        <div className="userRow-type-container">
          <p className="userRow-type">{user.type}</p>
        </div>
        <div className="userRow-repos-container">
          <img className="userRow-repoIcon" src={DarkRepoIcon} alt="repoIcon" />
          {!repos ? (
            <div className="userRow-repos">
              <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <p className="userRow-repos">{repos}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRow;
