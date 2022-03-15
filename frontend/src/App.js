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
import Subscription from "./users/pages/Subscription";
import AddSubscription from "./users/pages/AddSubscription";
import UserTrainer from "./trainers/pages/UserTrainer";

// trainer
import TrainerClasses from "./gym-classes/pages/TrainerClasses";

// admin
import Classes from "./gym-classes/pages/Classes";
import HiringRequests from "./hiring/pages/HiringRequests";
import AddGymClass from "./gym-classes/pages/AddGymClass";
import UsersPayment from "./users/pages/UsersPayment";
import PaymentConfirmation from "./users/pages/PaymentConfirmation";

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
  const [clientSubScription, setClientSubscription] = useState(null);
  const [trainerId, setTrainerId] = useState("");

  const loginUser = useCallback((cId, subscription) => {
    setUserIsLoggedIn(true);
    setClientId(cId);
    setClientSubscription(subscription);
  }, []);

  const updateSubscription = useCallback((subscription) => {
    setClientSubscription(subscription);
  }, []);

  const logoutUser = useCallback(() => {
    setUserIsLoggedIn(false);
  }, []);

  const loginTrainer = useCallback((tId) => {
    setTrainerIsLoggedIn(true);
    setTrainerId(tId);
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
        <Route path='/:clientid/subscription' exact>
          <Subscription />
        </Route>
        <Route path='/:clientid/addsubscription' exact>
          <AddSubscription />
        </Route>
        <Route path='/:clientid/trainer' exact>
          <UserTrainer />
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
        <Route path='/newclass' exact>
          <AddGymClass />
        </Route>
        <Route path='/hiringrequests' exact>
          <HiringRequests />
        </Route>
        <Route path='/hiringrequests/:hiringrequestid' exact>
          <HiringRequestDetails />
        </Route>
        <Route path='/payments' exact>
          <UsersPayment />
        </Route>
        <Route path='/payments/:clientid' exact>
          <PaymentConfirmation />
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
          trainerId: trainerId,
        }}
      >
        <UserContext.Provider
          value={{
            isLoggedIn: userIsLoggedIn,
            login: loginUser,
            logout: logoutUser,
            userId: clientId,
            subscription: clientSubScription,
            updateSubscription: updateSubscription,
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
