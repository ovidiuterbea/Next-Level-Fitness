import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../shared/context/user-context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const TrainerItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const { sendRequest, error } = useHttpClient();
  const history = useHistory();
  const clientId = useParams().clientid;
  const [mesaj, setMesaj] = useState("");
  const [severity, setSeverity] = useState("success");
  const userAuth = useContext(UserContext);

  const alocatePersonalTrainer = async () => {
    try {
      await sendRequest(
        `http://localhost:8080/api/clients/${clientId}/trainer/${props.id}`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setMesaj("V-ati alocat antrenor personal cu succes!");
      setSeverity("success");
      handleClick();
    } catch (err) {
      setMesaj(error);
      setSeverity("error");
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push(`/${userAuth.userId}/trainer`);
  };
  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {mesaj}
        </Alert>
      </Snackbar>
      <li className='user-item'>
        <h1 className='hiring-name'>
          {props.name} {props.surname}
        </h1>

        <div className='user__buttons'>
          <Button
            className='btn-accept'
            variant='contained'
            style={{
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
              backgroundColor: "green",
            }}
            onClick={alocatePersonalTrainer}
          >
            Alege acest antrenor
          </Button>
        </div>
      </li>
    </React.Fragment>
  );
};

export default TrainerItem;
