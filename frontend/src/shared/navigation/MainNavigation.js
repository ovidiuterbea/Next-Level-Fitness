import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop";
import { UserContext } from "../context/user-context";
import { TrainerContext } from "../context/trainer-context";
import { AdminContext } from "../context/admin-context";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const userAuth = useContext(UserContext);
  const trainerAuth = useContext(TrainerContext);
  const adminAuth = useContext(AdminContext);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className='main-navigation__menu-btn'
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          {!userAuth.isLoggedIn &&
            !trainerAuth.isLoggedIn &&
            !adminAuth.isLoggedIn && (
              <NavLink
                to='/mainpage'
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Next-<span style={{ color: "#FFEF00" }}>Level</span> Fitness{" "}
              </NavLink>
            )}
          {adminAuth.isLoggedIn && (
            <span style={{ color: "#FFEF00" }}>Administrator</span>
          )}
          {trainerAuth.isLoggedIn && (
            <span style={{ color: "#FFEF00" }}>Trainer</span>
          )}
          {userAuth.isLoggedIn && (
            <span style={{ color: "#FFEF00" }}>User</span>
          )}
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
