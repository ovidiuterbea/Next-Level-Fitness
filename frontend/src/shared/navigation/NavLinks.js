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
    <ul className='nav-links'>
      {userAuth.isLoggedIn &&
        (userAuth.subscription === "gold" ||
          userAuth.subscription === "platinum") && (
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
      {userAuth.isLoggedIn &&
        (userAuth.subscription === "gold" ||
          userAuth.subscription === "platinum") && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to={`/${userAuth.userId}/myclasses`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              My classes
            </NavLink>
          </li>
        )}
      {userAuth.isLoggedIn && userAuth.subscription === "platinum" && (
        <li>
          <NavLink
            activeClassName='activeLink'
            to={`/${userAuth.userId}/trainer`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            My trainer
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
      {userAuth.isLoggedIn && (
        <div className='btn-auth'>
          <NavLink
            to='/'
            onClick={() => {
              window.scrollTo(0, 0);
              userAuth.logout();
            }}
          >
            Logout
          </NavLink>
        </div>
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
            My classes
          </NavLink>
        </li>
      )}
      {trainerAuth.isLoggedIn && (
        <li>
          <NavLink
            activeClassName='activeLink'
            to={`/${trainerAuth.trainerId}/clients`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            My clients
          </NavLink>
        </li>
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
            Logout
          </NavLink>
        </div>
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
      {adminAuth.isLoggedIn && (
        <div className='btn-auth'>
          <NavLink
            to='/'
            onClick={() => {
              window.scrollTo(0, 0);
              adminAuth.logout();
            }}
          >
            Logout
          </NavLink>
        </div>
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
      {!userAuth.isLoggedIn &&
        !trainerAuth.isLoggedIn &&
        !adminAuth.isLoggedIn && (
          <li>
            <NavLink
              activeClassName='activeLink'
              to='/auth'
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              exact
            >
              Contul tau
            </NavLink>
          </li>
        )}
    </ul>
  );
};

export default NavLinks;
