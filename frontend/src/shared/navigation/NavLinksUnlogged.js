import React from "react";
import { NavLink } from "react-router-dom";

// import { AuthContext } from "../../context/auth-context";
import "./NavLinksUnlogged.css";

const NavLinksUnlogged = (props) => {
  //   const auth = useContext(AuthContext);
  //   const userId = auth.userId;

  return (
    <div className='main-navigation'>
      <NavLink
        to='/mainpage'
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <h2>
          Next-<span style={{ color: "#FFEF00" }}>Level</span> Fitness{" "}
        </h2>
      </NavLink>
      <ul className='nav-links'>
        <li>
          <NavLink
            activeClassName='activeLink'
            to={`/tarife`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Tarife
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName='activeLink'
            to='/personaltraining'
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            exact
          >
            Personal Training
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName='activeLink'
            to='/activitati'
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            exact
          >
            Activitati
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName='activeLink'
            to='/hiring'
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            exact
          >
            Hiring Trainers
          </NavLink>
        </li>
      </ul>
      <div className='btn-auth'>
        <NavLink
          to='/mainpage'
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <h2>Contul tau</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default NavLinksUnlogged;
