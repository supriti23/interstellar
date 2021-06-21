import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <img src={logo} alt="logo" />
        <div>
        <NavLink
          to="/"
          exact={true}
          activeStyle={{ color: "red" }}
          style={{ textDecoration: "none" }}
        >
          Home
        </NavLink>
        <NavLink
          to="/universes"
          activeStyle={{ color: "red" }}
          style={{ textDecoration: "none" }}
        >
          Universes
        </NavLink>
        <NavLink
          to="/stars"
          activeStyle={{ color: "red" }}
          style={{ textDecoration: "none" }}
        >
          Stars
        </NavLink>
        <NavLink
          to="/imprint"
          activeStyle={{ color: "red" }}
          style={{ textDecoration: "none" }}
        >
          Imprint
        </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
