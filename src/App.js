import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./Components/Nav";
import RemainingRequests from "./Components/RemainingRequests";
import PopularUsers from "./Components/PopularUsers";
import UserPage from "./Components/UserPage";

import "./CSS/App.css";

const App = () => {
  const [view, setView] = useState("list");

  return (
    <div className="body">
      <Nav selectedView={(selectedView) => setView(selectedView)} />
      <RemainingRequests />
      <Switch>
        <Route path="/" exact component={() => <PopularUsers view={view} />} />
        <Route path="/:username" component={UserPage} />
      </Switch>
    </div>
  );
};

export default App;
