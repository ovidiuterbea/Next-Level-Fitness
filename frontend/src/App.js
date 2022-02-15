import Activitati from "./unlogged/Activitati";
import Tarife from "./unlogged/Tarife";
import PersonalTraining from "./unlogged/PersonalTraining";
import MainPage from "./unlogged/MainPage";
import HiringForm from "./unlogged/HiringForm";
import NavLinksUnlogged from "./shared/navigation/NavLinksUnlogged";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import { UserContext } from "./shared/context/user-context";
// import { useState, useCallback } from "react";
import React from "react";

const App = () => {
  // const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  // const loginUser = useCallback(() => {
  //   setUserIsLoggedIn(true);
  // }, []);

  // const logoutUser = useCallback(() => {
  //   setUserIsLoggedIn(false);
  // }, []);

  let routes;

  routes = (
    <Switch>
      <Route path="/mainpage" exact>
        <MainPage />
      </Route>
      <Route path="/tarife" exact>
        <Tarife />
      </Route>
      <Route path="/personaltraining" exact>
        <PersonalTraining />
      </Route>
      <Route path="/activitati" exact>
        <Activitati />
      </Route>
      <Route path="/hiring" exact>
        <HiringForm />
      </Route>
      <Redirect to="/mainpage" />
    </Switch>
  );

  return (
    <Router>
      <NavLinksUnlogged />
      {routes}
    </Router>
  );
};

export default App;
