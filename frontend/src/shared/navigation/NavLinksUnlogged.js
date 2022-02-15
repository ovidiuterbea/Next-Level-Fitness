import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// import { AuthContext } from "../../context/auth-context";
import "./NavLinksUnlogged.css";

const NavLinksUnlogged = (props) => {
  //   const auth = useContext(AuthContext);
  //   const userId = auth.userId;

  return (
    <div className="main-navigation">
      <NavLink to="/mainpage">
        <h2>
          Next-<span style={{ color: "#FFFF66" }}>Level</span> Fitness{" "}
        </h2>
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink activeClassName="activeLink" to={`/tarife`}>
            Tarife
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="activeLink" to="/personaltraining" exact>
            Personal Training
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="activeLink" to="/activitati" exact>
            Activitati
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeLink" to="/hiring" exact>
            Hiring Trainers
          </NavLink>
        </li>
      </ul>
      <div className="btn-auth">
        <NavLink to="/mainpage">
          <h2>Contul tau</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default NavLinksUnlogged;
