import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { TrainerContext } from "../context/trainer-context";
import { AdminContext } from "../context/admin-context";
import { useContext } from "react";
import "./NavLinks.css";

const NavLinks = (props) => {
  const userAuth = useContext(UserContext);
  const trainerAuth = useContext(TrainerContext);
  const adminAuth = useContext(AdminContext);

  return (
    <div className='main-navigation'>
      {!userAuth.isLoggedIn &&
        !trainerAuth.isLoggedIn &&
        !adminAuth.isLoggedIn && (
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
        )}
      {adminAuth.isLoggedIn && (
        <h2 style={{ color: "#FFEF00" }}>Administrator</h2>
      )}
      {trainerAuth.isLoggedIn && <h2 style={{ color: "#FFEF00" }}>Trainer</h2>}
      {userAuth.isLoggedIn && <h2 style={{ color: "#FFEF00" }}>User</h2>}
      <ul className='nav-links'>
        {userAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/${userAuth.userId}/classes`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Fitness classes
            </NavLink>
          </li>
        )}
        {userAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/${userAuth.userId}/subscription`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              My subscription
            </NavLink>
          </li>
        )}
        {trainerAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/${trainerAuth.trainerId}/classes`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Clasele mele
            </NavLink>
          </li>
        )}
        {adminAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/classes`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Clase de fitness
            </NavLink>
          </li>
        )}
        {adminAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/payments`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Payments
            </NavLink>
          </li>
        )}
        {adminAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/hiringrequests`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Hiring requests
            </NavLink>
          </li>
        )}
        {!userAuth.isLoggedIn &&
          !trainerAuth.isLoggedIn &&
          !adminAuth.isLoggedIn && (
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
          )}

        {!userAuth.isLoggedIn &&
          !trainerAuth.isLoggedIn &&
          !adminAuth.isLoggedIn && (
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
          )}

        {!userAuth.isLoggedIn &&
          !trainerAuth.isLoggedIn &&
          !adminAuth.isLoggedIn && (
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
          )}
        {!userAuth.isLoggedIn &&
          !trainerAuth.isLoggedIn &&
          !adminAuth.isLoggedIn && (
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
          )}
      </ul>
      {!userAuth.isLoggedIn &&
        !trainerAuth.isLoggedIn &&
        !adminAuth.isLoggedIn && (
          <div className='btn-auth'>
            <NavLink
              to='/auth'
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <h2>Contul tau</h2>
            </NavLink>
          </div>
        )}
      {userAuth.isLoggedIn && (
        <div className='btn-auth'>
          <NavLink
            to='/'
            onClick={() => {
              window.scrollTo(0, 0);
              userAuth.logout();
            }}
          >
            <h2>Logout</h2>
          </NavLink>
        </div>
      )}
      {trainerAuth.isLoggedIn && (
        <div className='btn-auth'>
          <NavLink
            to='/'
            onClick={() => {
              window.scrollTo(0, 0);
              trainerAuth.logout();
            }}
          >
            <h2>Logout</h2>
          </NavLink>
        </div>
      )}
      {adminAuth.isLoggedIn && (
        <div className='btn-auth'>
          <NavLink
            to='/'
            onClick={() => {
              window.scrollTo(0, 0);
              adminAuth.logout();
            }}
          >
            <h2>Logout</h2>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
