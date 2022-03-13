import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Subscription.css";
import {
  Accordion,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { UserContext } from "../../shared/context/user-context";

//images
import bronze from "../../media/bronze.jpeg";
import silver from "../../media/silver.jpg";
import gold from "../../media/gold.jpg";
import platinum from "../../media/platinum2.jpg";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AddSubscription = (props) => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [btnIsShowed, setBtnIsShowed] = useState(false);
  const clientId = useParams().clientid;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const userAuth = useContext(UserContext);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push(`/${clientId}/subscription`);
  };

  return (
    <React.Fragment>
      {selectedSubscription && (
        <div className='confirm-area'>
          <h2>Abonamentul selectat este {selectedSubscription}</h2>
          <Button
            variant='contained'
            style={{
              backgroundColor: "#181d01",
              fontSize: "1.2rem",
              fontFamily: "inherit",
            }}
            onClick={async (event) => {
              event.preventDefault();
              try {
                await sendRequest(
                  `http://localhost:8080/api/clients/subscription/${clientId}`,
                  "PATCH",
                  JSON.stringify({
                    subscription: selectedSubscription.toLowerCase(),
                  }),
                  {
                    "Content-Type": "application/json",
                  }
                );
                userAuth.updateSubscription(selectedSubscription.toLowerCase());
                handleClick();
              } catch (err) {}
            }}
          >
            Confirma abonamentul
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: "100%" }}
            >
              Abonamentul dumneavoastra a fost creat cu succes!
            </Alert>
          </Snackbar>
        </div>
      )}
      <div className='subscription-detail'>
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Bronze</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardMedia
                component='img'
                height='180'
                image={bronze}
                alt='bronze img'
              />
              <CardContent>
                <Typography>
                  Ofera accesul in sala de forta si la sauna
                </Typography>
                <Typography>Pretul abonamentului: 150 RON/LUNA</Typography>
              </CardContent>
              <CardActions style={{ marginTop: "0" }}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: "#85bb65",
                    color: "#f3f3f3",
                    height: "3rem",
                    fontSize: "1.2rem",
                    fontFamily: "inherit",
                  }}
                  onClick={() => {
                    setSelectedSubscription("Bronze");
                  }}
                >
                  Alege acest abonament
                </Button>
              </CardActions>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Silver</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardMedia
                component='img'
                height='180'
                image={silver}
                alt='silver img'
              />
              <CardContent>
                <Typography>
                  Ofera accesul in sala de forta si la sauna
                </Typography>
                <Typography>Ofera accesul la piscina</Typography>
                <Typography>Pretul abonamentului: 175 RON/LUNA</Typography>
              </CardContent>
              <CardActions style={{ marginTop: "0" }}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: "#85bb65",
                    color: "#f3f3f3",
                    height: "3rem",
                    fontSize: "1.2rem",
                    fontFamily: "inherit",
                  }}
                  onClick={() => {
                    setSelectedSubscription("Silver");
                    setBtnIsShowed(true);
                  }}
                >
                  Alege acest abonament
                </Button>
              </CardActions>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Gold</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardMedia
                component='img'
                height='180'
                image={gold}
                alt='gold img'
              />
              <CardContent>
                <Typography>
                  Ofera accesul in sala de forta si la sauna
                </Typography>
                <Typography>Ofera accesul la piscina</Typography>
                <Typography>
                  Ofera accesul la diversele clase de fitness
                </Typography>
                <Typography>Pretul abonamentului: 200 RON/LUNA</Typography>
              </CardContent>
              <CardActions style={{ marginTop: "0" }}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: "#85bb65",
                    color: "#f3f3f3",
                    height: "3rem",
                    fontSize: "1.2rem",
                    fontFamily: "inherit",
                  }}
                  onClick={() => {
                    setSelectedSubscription("Gold");
                    setBtnIsShowed(true);
                  }}
                >
                  Alege acest abonament
                </Button>
              </CardActions>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Platinum</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardMedia
                component='img'
                height='350'
                image={platinum}
                alt='platinum img'
              />
              <CardContent>
                <Typography>
                  Ofera accesul in sala de forta si la sauna
                </Typography>
                <Typography>Ofera accesul la piscina</Typography>
                <Typography>
                  Ofera accesul la diversele clase de fitness
                </Typography>
                <Typography>12 sedinte/luna cu un antrenor personal</Typography>
                <Typography>Pretul abonamentului: 250 RON/LUNA</Typography>
              </CardContent>
              <CardActions style={{ marginTop: "0" }}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: "#85bb65",
                    color: "#f3f3f3",
                    height: "3rem",
                    fontSize: "1.2rem",
                    fontFamily: "inherit",
                  }}
                  onClick={() => {
                    setSelectedSubscription("Platinum");
                    setBtnIsShowed(true);
                  }}
                >
                  Alege acest abonament
                </Button>
              </CardActions>
            </Card>
          </AccordionDetails>
        </Accordion>
      </div>
      {btnIsShowed && window.scrollY > 20 && (
        <Button
          style={{
            position: "fixed",
            bottom: "0.5rem",
            right: "0.5rem",
            backgroundColor: "#ffef00",
            color: "#0e1111",
          }}
          startIcon={<ArrowUpwardIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              setBtnIsShowed(false);
            }, 1000);
          }}
        >
          Catre abonamentul ales
        </Button>
      )}
    </React.Fragment>
  );
};

export default AddSubscription;
