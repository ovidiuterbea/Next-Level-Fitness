//unlogged
import Activitati from "./unlogged/Activitati";
import Tarife from "./unlogged/Tarife";
import PersonalTraining from "./unlogged/PersonalTraining";
import MainPage from "./unlogged/MainPage";
import HiringForm from "./unlogged/HiringForm";
import Auth from "./unlogged/Auth";
import NavLinks from "./shared/navigation/NavLinks";

// user
import UserClasses from "./gym-classes/pages/UserClasses";

// trainer
import TrainerClasses from "./gym-classes/pages/TrainerClasses";

// admin
import Classes from "./gym-classes/pages/Classes";
import HiringRequests from "./hiring/pages/HiringRequests";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { UserContext } from "./shared/context/user-context";
import { TrainerContext } from "./shared/context/trainer-context";
import { AdminContext } from "./shared/context/admin-context";
import { useState, useCallback } from "react";
import React from "react";
import HiringRequestDetails from "./hiring/pages/HiringRequestDetails";

const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [trainerIsLoggedIn, setTrainerIsLoggedIn] = useState(false);
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState("");

  const loginUser = useCallback((cId) => {
    setUserIsLoggedIn(true);
    setClientId(cId);
  }, []);

  const logoutUser = useCallback(() => {
    setUserIsLoggedIn(false);
  }, []);

  const loginTrainer = useCallback(() => {
    setTrainerIsLoggedIn(true);
  }, []);

  const logoutTrainer = useCallback(() => {
    setTrainerIsLoggedIn(false);
  }, []);

  const loginAdmin = useCallback(() => {
    setAdminIsLoggedIn(true);
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminIsLoggedIn(false);
  }, []);

  let routes;

  if (userIsLoggedIn) {
    routes = (
      <Switch>
        <Route path='/:clientid/classes' exact>
          <UserClasses />
        </Route>
      </Switch>
    );
  } else if (trainerIsLoggedIn) {
    routes = (
      <Switch>
        <Route path='/:trainerid/classes' exact>
          <TrainerClasses />
        </Route>
      </Switch>
    );
  } else if (adminIsLoggedIn) {
    routes = (
      <Switch>
        <Route path='/classes' exact>
          <Classes />
        </Route>
        <Route path='/hiringrequests' exact>
          <HiringRequests />
        </Route>
        <Route path='/hiringrequests/:hiringrequestid' exact>
          <HiringRequestDetails />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/mainpage' exact>
          <MainPage />
        </Route>
        <Route path='/tarife' exact>
          <Tarife />
        </Route>
        <Route path='/personaltraining' exact>
          <PersonalTraining />
        </Route>
        <Route path='/activitati' exact>
          <Activitati />
        </Route>
        <Route path='/hiring' exact>
          <HiringForm />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/mainpage' />
      </Switch>
    );
  }

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn: adminIsLoggedIn,
        login: loginAdmin,
        logout: logoutAdmin,
      }}
    >
      <TrainerContext.Provider
        value={{
          isLoggedIn: trainerIsLoggedIn,
          login: loginTrainer,
          logout: logoutTrainer,
        }}
      >
        <UserContext.Provider
          value={{
            isLoggedIn: userIsLoggedIn,
            login: loginUser,
            logout: logoutUser,
            userId: clientId,
          }}
        >
          <Router>
            <NavLinks />
            {routes}
          </Router>
        </UserContext.Provider>
      </TrainerContext.Provider>
    </AdminContext.Provider>
  );
};

export default App;
