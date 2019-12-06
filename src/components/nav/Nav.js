import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./_nav.scss";

class Nav extends Component {
  render() {
    return (
      <nav className="c_nav">
        <ul>
          <li>
            <NavLink to="/om" activeClassName="c_nav__active">
              Om
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName="c_nav__active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/404" activeClassName="c_nav__active">
              404
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
