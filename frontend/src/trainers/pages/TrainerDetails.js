import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const TrainerDetails = (props) => {
  const [loadedTrainerFetch, setLoadedTrainerFetch] = useState();
  const [mesaj, setMesaj] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = React.useState(false);
  const { sendRequest, error } = useHttpClient();
  const history = useHistory();
  const clientId = useParams().clientid;
  const trainerId = useParams().trainerid;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push(`/${clientId}/trainer`);
  };

  useEffect(() => {
    const getTrainer = async () => {
      const response = await fetch(
        `http://localhost:8080/api/trainers/${trainerId}`
      );
      const data = await response.json();
      setLoadedTrainerFetch(data.trainer);
    };
    getTrainer();
  }, [trainerId]);

  const deletePersonalTrainer = async () => {
    try {
      await sendRequest(
        `http://localhost:8080/api/clients/${clientId}/trainerDel/${trainerId}`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setMesaj("Ati renuntat cu success la antrenorul personal");
      setSeverity("success");
      handleClick();
    } catch (err) {
      setMesaj(error);
      setSeverity("error");
      handleClick();
    }
  };

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {mesaj}
        </Alert>
      </Snackbar>
      {loadedTrainerFetch && (
        <div className='normal-card' style={{ color: "#0e1111" }}>
          <img
            alt='Canditate'
            className='image-center'
            src={`http://localhost:8080/${loadedTrainerFetch.image}`}
          ></img>
          <h2>
            Antrenorul tau este {loadedTrainerFetch.name}{" "}
            {loadedTrainerFetch.surname}.
          </h2>
          <h2>Experienta acestuia este {loadedTrainerFetch.experience}.</h2>
          <Button
            variant='contained'
            style={{
              height: "3rem",
              fontSize: "2vh",
              fontFamily: "inherit",
              marginTop: "1rem",
              backgroundColor: "red",
            }}
            startIcon={<CloseIcon />}
            onClick={deletePersonalTrainer}
          >
            Renunta la antrenor personal
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default TrainerDetails;
