import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../pages/home/Home";
import Oslo from "../pages/table/oslo/Oslo";
import Hamar from "../pages/table/hamar/Hamar";
import Players from "../pages/players/Players";
import NoMatch from "../pages/noMatch/NoMatch";

export default () => (
  <div className="app-wrapper">
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/players" component={Players} />
        <Route path="/oslo" component={Oslo} />
        <Route path="/hamar" component={Hamar} />
        <Route component={NoMatch} />
      </Switch>
      <div className="app-wrapper__bottom"></div>
    </Router>
  </div>
);
