//unlogged
import Activitati from "./unlogged/Activitati";
import Tarife from "./unlogged/Tarife";
import PersonalTraining from "./unlogged/PersonalTraining";
import MainPage from "./unlogged/MainPage";
import HiringForm from "./unlogged/HiringForm";
import Auth from "./unlogged/Auth";
import MainNavigation from "./shared/navigation/MainNavigation";

// user
import UserClasses from "./gym-classes/pages/UserClasses";
import Subscription from "./users/pages/Subscription";
import AddSubscription from "./users/pages/AddSubscription";
import UserTrainer from "./trainers/pages/UserTrainer";
import AddPersonalTrainer from "./trainers/pages/AddPersonalTrainer";
import TrainerDetails from "./trainers/pages/TrainerDetails";
import UserClassesDetails from "./gym-classes/pages/UserClassesDetails";

// trainer
import TrainerClasses from "./gym-classes/pages/TrainerClasses";
import TrainerClients from "./users/pages/TrainerClients";

// admin
import Classes from "./gym-classes/pages/Classes";
import HiringRequests from "./hiring/pages/HiringRequests";
import AddGymClass from "./gym-classes/pages/AddGymClass";
import UsersPayment from "./users/pages/UsersPayment";
import PaymentConfirmation from "./users/pages/PaymentConfirmation";
import Statistics from "./users/pages/Statistics";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { UserContext } from "./shared/context/user-context";
import { TrainerContext } from "./shared/context/trainer-context";
import { AdminContext } from "./shared/context/admin-context";
import { useState, useCallback, useEffect } from "react";
import React from "react";
import HiringRequestDetails from "./hiring/pages/HiringRequestDetails";

// mui
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

let logoutTimer;

const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [trainerIsLoggedIn, setTrainerIsLoggedIn] = useState(false);
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSubScription, setClientSubscription] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [clientSurname, setClientSurname] = useState(null);
  const [trainerId, setTrainerId] = useState("");
  const [openWelcomeUser, setOpenWelcomeUser] = useState(false);
  const [sessionExpirationDate, setSessionExpirationDate] = useState();

  const handleCloseWelcomeUser = () => {
    setOpenWelcomeUser(false);
  };

  const handleOpenWelcomeUser = () => {
    setOpenWelcomeUser(true);
  };

  const loginUser = useCallback((cId, subscription, name, surname) => {
    setClientId(cId);
    setClientSubscription(subscription);
    setClientName(name);
    setClientSurname(surname);
    setUserIsLoggedIn(true);
    const sessionExpirationDate = new Date(
      new Date().getTime() + 1000 * 60 * 60
    );
    setSessionExpirationDate(sessionExpirationDate);
    localStorage.setItem(
      "clientData",
      JSON.stringify({
        clientId: cId,
        subscription: subscription,
        name: name,
        surname: surname,
        expiration: sessionExpirationDate.toISOString(),
      })
    );
  }, []);

  const loginTrainer = useCallback((tId) => {
    setTrainerId(tId);
    setTrainerIsLoggedIn(true);
    const sessionExpirationDate = new Date(
      new Date().getTime() + 1000 * 60 * 60
    );
    setSessionExpirationDate(sessionExpirationDate);
    localStorage.setItem(
      "trainerData",
      JSON.stringify({
        trainerId: tId,
        expiration: sessionExpirationDate.toISOString(),
      })
    );
  }, []);

  const logoutTrainer = useCallback(() => {
    setTrainerIsLoggedIn(false);
    setSessionExpirationDate(null);
    localStorage.removeItem("trainerData");
  }, []);

  const logoutUser = useCallback(() => {
    setUserIsLoggedIn(false);
    setSessionExpirationDate(null);
    localStorage.removeItem("clientData");
  }, []);

  useEffect(() => {
    const storedDataClient = JSON.parse(localStorage.getItem("clientData"));
    const storedDataTrainer = JSON.parse(localStorage.getItem("trainerData"));
    if (
      storedDataClient &&
      new Date(storedDataClient.expiration) > new Date()
    ) {
      loginUser(
        storedDataClient.clientId,
        storedDataClient.subscription,
        storedDataClient.name,
        storedDataClient.surname
      );
      setOpenWelcomeUser(true);
    }
    if (
      storedDataTrainer &&
      new Date(storedDataTrainer.expiration) > new Date()
    ) {
      loginTrainer(storedDataTrainer.trainerId);
    }
  }, [loginUser, loginTrainer]);

  const updateSubscription = useCallback((subscription) => {
    setClientSubscription(subscription);
  }, []);

  const loginAdmin = useCallback(() => {
    setAdminIsLoggedIn(true);
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminIsLoggedIn(false);
  }, []);

  useEffect(() => {
    if (sessionExpirationDate && userIsLoggedIn) {
      const remainingTime =
        sessionExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutUser, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }

    if (sessionExpirationDate && trainerIsLoggedIn) {
      const remainingTime =
        sessionExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutTrainer, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [
    logoutUser,
    logoutTrainer,
    sessionExpirationDate,
    userIsLoggedIn,
    trainerIsLoggedIn,
  ]);

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
        <Route path='/:clientid/trainer/addtrainer' exact>
          <AddPersonalTrainer />
        </Route>
        <Route path='/:clientid/trainer/:trainerid' exact>
          <TrainerDetails />
        </Route>
        <Route path='/:clientid/myclasses' exact>
          <UserClassesDetails />
        </Route>
        <Redirect to={`/${clientId}/subscription`} />
      </Switch>
    );
  } else if (trainerIsLoggedIn) {
    routes = (
      <Switch>
        <Route path='/:trainerid/classes' exact>
          <TrainerClasses />
        </Route>
        <Route path='/:trainerid/clients' exact>
          <TrainerClients />
        </Route>
        <Redirect to={`/${trainerId}/classes`} />
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
        <Route path='/statistics' exact>
          <Statistics />
        </Route>
        <Redirect to='/classes' />
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
    <React.Fragment>
      {openWelcomeUser && (
        <Dialog
          open={openWelcomeUser}
          TransitionComponent={Transition}
          onClose={handleCloseWelcomeUser}
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Gata de antrenament {clientName} {clientSurname}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseWelcomeUser}>Catre profilul tau</Button>
          </DialogActions>
        </Dialog>
      )}
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
              name: clientName,
              surname: clientSurname,
              openWelcomeDialog: handleOpenWelcomeUser,
              updateSubscription: updateSubscription,
            }}
          >
            <Router>
              <MainNavigation />
              {routes}
            </Router>
          </UserContext.Provider>
        </TrainerContext.Provider>
      </AdminContext.Provider>
    </React.Fragment>
  );
};

export default App;
