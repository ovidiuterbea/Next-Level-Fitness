import React, { useContext, useState } from "react";
import { UserContext } from "../../shared/context/user-context";
import "./Subscription.css";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Subscription = (props) => {
  const userAuth = useContext(UserContext);
  const { error, sendRequest } = useHttpClient();
  const [open, setOpen] = React.useState(false);
  const [mesaj, setMesaj] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    userAuth.updateSubscription(null);
    // history.push(`/${clientId}/subscription`);
  };

  const deleteSubscription = async () => {
    try {
      await sendRequest(
        `http://localhost:8080/api/clients//subscriptiondel/${userAuth.userId}`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setMesaj("V-ati sters abonamentul cu success");
      setSeverity("success");
      handleClick();
    } catch (err) {
      setMesaj(error);
      setSeverity("error");
    }
  };

  if (userAuth.subscription === null) {
    return (
      <div className='subscription-detail'>
        <div className='subscription-title'>
          Momentan nu aveti niciun abonament cumparat
        </div>
        <Link to={`/${userAuth.userId}/addsubscription`}>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            id='muibtn'
            variant='contained'
            style={{
              backgroundColor: "#0e1111",
              color: "#f3f3f3",
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
            }}
          >
            Vezi toate abonamentele
          </Button>
        </Link>
      </div>
    );
  } else if (userAuth.subscription === "bronze") {
    return (
      <React.Fragment>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {mesaj}
          </Alert>
        </Snackbar>
        <div className='subscription-detail'>
          <h1>Beneficiile tale | Abonament Bronze</h1>
          <h2>Aveti access in sala de forta si la sauna</h2>
        </div>
        <Stack alignItems='center'>
          <Button
            onClick={deleteSubscription}
            id='muibtn'
            variant='contained'
            style={{
              backgroundColor: "red",
              color: "#0e1111",
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
            }}
          >
            Renunta la abonament
          </Button>
        </Stack>
      </React.Fragment>
    );
  } else if (userAuth.subscription === "silver") {
    return (
      <React.Fragment>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {mesaj}
          </Alert>
        </Snackbar>
        <div className='subscription-detail'>
          <h1>Beneficiile tale | Abonament Silver</h1>
          <h2>Aveti access in sala de forta si la sauna</h2>
          <h2>Aveti access la piscina</h2>
        </div>
        <Stack alignItems='center'>
          <Button
            onClick={deleteSubscription}
            id='muibtn'
            variant='contained'
            style={{
              backgroundColor: "red",
              color: "#0e1111",
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
            }}
          >
            Renunta la abonament
          </Button>
        </Stack>
      </React.Fragment>
    );
  } else if (userAuth.subscription === "gold") {
    return (
      <React.Fragment>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {mesaj}
          </Alert>
        </Snackbar>
        <div className='subscription-detail'>
          <h1>Beneficiile tale | Abonament Gold</h1>
          <h2>Aveti access in sala de forta si la sauna</h2>
          <h2>Aveti access la piscina</h2>
          <h2>
            Aveti access la diversele {"  "}
            <Link
              to={`/${userAuth.userId}/classes`}
              style={{
                backgroundColor: "#0e1111",
                color: "#ffef00",
                borderRadius: "10px",
                padding: "0.5rem",
              }}
            >
              clase de fitness
            </Link>
          </h2>
        </div>
        <Stack alignItems='center'>
          <Button
            onClick={deleteSubscription}
            id='muibtn'
            variant='contained'
            style={{
              backgroundColor: "red",
              color: "#0e1111",
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
            }}
          >
            Renunta la abonament
          </Button>
        </Stack>
      </React.Fragment>
    );
  } else if (userAuth.subscription === "platinum") {
    return (
      <React.Fragment>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {mesaj}
          </Alert>
        </Snackbar>
        <div className='subscription-detail'>
          <h1>Beneficiile tale | Abonament Platinum</h1>
          <h2>Aveti access in sala de forta si la sauna</h2>
          <h2>Aveti access la piscina</h2>
          <h2>
            Aveti access la diversele {"  "}
            <Link
              to={`/${userAuth.userId}/classes`}
              style={{
                backgroundColor: "#0e1111",
                color: "#ffef00",
                borderRadius: "10px",
                padding: "0.5rem",
              }}
            >
              clase de fitness
            </Link>
          </h2>
          <h2>
            Va puteti alege{" "}
            <Link
              to={`/${userAuth.userId}/trainer`}
              style={{
                backgroundColor: "#0e1111",
                color: "#ffef00",
                borderRadius: "10px",
                padding: "0.5rem",
              }}
            >
              antrenor personal
            </Link>{" "}
            , in caz ca nu aveti unul deja
          </h2>
        </div>
        <Stack alignItems='center'>
          <Button
            onClick={deleteSubscription}
            id='muibtn'
            variant='contained'
            style={{
              backgroundColor: "red",
              color: "#0e1111",
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
            }}
          >
            Renunta la abonament
          </Button>
        </Stack>
      </React.Fragment>
    );
  }
};

export default Subscription;
