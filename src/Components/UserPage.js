import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";

import Page404 from "./Page404";

import DarkRepoIcon from "../CSS/Icons/darkRepoIcon.png";
import LightUserIcon from "../CSS/Icons/lightUserIcon.png";

import "../CSS/UserPage.css";

const UserPage = ({ match }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [organizations, setOrganizations] = useState(null);

  useEffect(() => {
    setUser(null);
    const getUser = async () => {
      const user = await axios(
        `https://api.github.com/users/${match.params.username}`
      ).catch(() => setUser(404));
      if (user && user !== 404) setUser(user.data);
    };
    getUser();
  }, [match]);
  useEffect(() => {
    const getRepos = async () => {
      const repo = await axios(user.repos_url);
      setRepos(repo.data);
    };
    const getOrganizations = async () => {
      const organization = await axios(user.organizations_url);
      setOrganizations(organization.data);
    };
    if (user && user !== 404) {
      getOrganizations();
      getRepos();
    }
  }, [user]);

  const returnRepos = () => {
    if (repos) {
      let allRepos = [];
      for (let i = 0; i <= 2; i++) {
        if (repos[i]) allRepos = [...allRepos, repos[i].name];
      }
      if (allRepos.length) return allRepos.join(", ");
      else return <span className="userPage-empty">No repositories</span>;
    }
  };
  const returnOrganizations = () => {
    if (organizations) {
      let allOrganizations = [];
      for (let i = 0; i < organizations.length; i++) {
        if (organizations[i])
          allOrganizations = [
            ...allOrganizations,
            [organizations[i].avatar_url, organizations[i].login],
          ];
      }
      if (allOrganizations.length) return allOrganizations;
      else return "No organizations";
    }
  };

  if (user && repos && organizations) {
    // console.log(user);
    // console.log(repos);
    // console.log(organizations);
    // console.log(returnOrganizations());
  }

  return (
    <div className="userPage">
      {user === 404 ? (
        <Page404 />
      ) : user && user !== 404 ? (
        <div className="userPage-container">
          <div className="userPage-left-column">
            <img
              src={user.avatar_url}
              className="userPage-avatar"
              alt="user avatar"
            />
          </div>
          <div className="userPage-right-column">
            <div className="userPage-name-type-container">
              <div className="userPage-name-container">
                <img
                  src={LightUserIcon}
                  alt="userIcon"
                  className="userPage-userIcon"
                />
                <a
                  href={user.html_url}
                  className="userPage-name"
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.login}
                </a>
              </div>
              <div className="userPage-type-container">
                <p className="userPage-type">{user.type}</p>
              </div>
            </div>
            <div className="userPage-repos-container">
              <img
                src={DarkRepoIcon}
                alt="reposIcon"
                className="userPage-reposIcon"
              />
              <p className="userPage-repos">{returnRepos()}</p>
            </div>
            <h3 className="userPage-organizations-title">Organizations:</h3>
            <div className="userPage-organizations-container">
              {returnOrganizations() &&
              returnOrganizations() !== "No organizations" ? (
                returnOrganizations().map((organization) => (
                  <div key={organization[1]} className="organization-container">
                    <img
                      src={organization[0]}
                      alt={organization[1]}
                      className="userPage-organization-avatar"
                    />
                    <a
                      href={`https://github.com/${organization[1]}`}
                      target="_blank"
                      rel="noreferrer"
                      className="userPage-organization-link"
                    >
                      {organization[1]}
                    </a>
                  </div>
                ))
              ) : returnOrganizations() !== "No organizations" ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              ) : (
                <span className="userPage-empty">No organizations</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader
          className="loader"
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )}
    </div>
  );
};

export default UserPage;
