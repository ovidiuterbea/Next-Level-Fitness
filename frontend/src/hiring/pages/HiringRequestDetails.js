import "./HiringRequestDetails.css";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import imgHolder from "../../media/trainer-bazat.jpeg";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const HiringRequestDetails = (props) => {
  const hiringRequestId = useParams().hiringrequestid;
  const [loadedHiringRequestFetch, setLoadedHiringRequestFetch] = useState();
  const [readableDate, setReadableDate] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    deleteHiringRequestWithoutRedirect();
  };

  useEffect(() => {
    const getHiringRequest = async () => {
      const response = await fetch(
        `http://localhost:8080/api/hiring/${hiringRequestId}`
      );
      const data = await response.json();
      setLoadedHiringRequestFetch(data);
    };
    getHiringRequest();
  }, [hiringRequestId]);

  useEffect(() => {
    if (loadedHiringRequestFetch) {
      const nonReadableDate =
        loadedHiringRequestFetch.hiringRequest.birthdate.slice(0, 10);

      let parts = nonReadableDate.split("-");
      let myDate = new Date(parts[0], parts[1] - 1, parts[2]);
      setReadableDate(myDate.toDateString().slice(4));
    }
  }, [loadedHiringRequestFetch]);

  const deleteHiringRequest = async () => {
    await fetch(`http://localhost:8080/api/hiring/${hiringRequestId}`, {
      method: "DELETE",
    });
    history.push("/hiringrequests");
  };

  const deleteHiringRequestWithoutRedirect = async () => {
    await fetch(`http://localhost:8080/api/hiring/${hiringRequestId}`, {
      method: "DELETE",
    });
    setOpen(false);
    history.push("/hiringrequests");
  };

  const createTrainerHandler = async () => {
    const password = generatePassword();
    setGeneratedPassword(password);
    await fetch(`http://localhost:8080/api/trainers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: loadedHiringRequestFetch.hiringRequest.name,
        surname: loadedHiringRequestFetch.hiringRequest.surname,
        email: loadedHiringRequestFetch.hiringRequest.email,
        password: password,
        address: loadedHiringRequestFetch.hiringRequest.address,
        birthdate: loadedHiringRequestFetch.hiringRequest.birthdate,
        experience: loadedHiringRequestFetch.hiringRequest.experience,
      }),
    });
    setOpen(true);
  };

  return (
    <React.Fragment>
      {open && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              The password for {loadedHiringRequestFetch.hiringRequest.name}{" "}
              {loadedHiringRequestFetch.hiringRequest.surname} is{" "}
              {generatedPassword}. Please inform him about this.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
      {loadedHiringRequestFetch && (
        <div className='hiring-detail'>
          <div className='center'>
            <h2 className='hiring-title'>Canditate Details</h2>
          </div>
          <div className='hiring-flex-container'>
            <div className='hiring-information'>
              <h3>
                Name and surname: {loadedHiringRequestFetch.hiringRequest.name}{" "}
                {loadedHiringRequestFetch.hiringRequest.surname}
              </h3>
              <h3>Birthdate: {readableDate}</h3>
              <h3>
                Experience:{" "}
                {loadedHiringRequestFetch.hiringRequest.experience ===
                  "Entry Level" && (
                  <span className='hiring-experience__entry'>Entry Level</span>
                )}
                {loadedHiringRequestFetch.hiringRequest.experience ===
                  "Middle Level" && (
                  <span className='hiring-experience__middle'>
                    Middle Level
                  </span>
                )}
                {loadedHiringRequestFetch.hiringRequest.experience ===
                  "Senior Level" && (
                  <span className='hiring-experience__senior'>
                    Senior Level
                  </span>
                )}
              </h3>
              <h3>Email: {loadedHiringRequestFetch.hiringRequest.email}</h3>
              <h3>
                Phone number: {loadedHiringRequestFetch.hiringRequest.phone}
              </h3>
              <h3>Address: {loadedHiringRequestFetch.hiringRequest.address}</h3>
              <h3>
                Description:{" "}
                {loadedHiringRequestFetch.hiringRequest.description}
              </h3>
            </div>
            <div className='hiring-photo'>
              <img
                alt='Canditate'
                className='image-center'
                src={imgHolder}
              ></img>
            </div>
          </div>
          <div className='hiring-buttons'>
            <Button
              className='btn-accept'
              variant='contained'
              style={{
                height: "3rem",
                fontSize: "1.2rem",
                fontFamily: "inherit",
                marginTop: "1rem",
              }}
              onClick={createTrainerHandler}
            >
              Accept
            </Button>
            <Button
              className='btn-decline'
              variant='contained'
              onClick={deleteHiringRequest}
              style={{
                height: "3rem",
                fontSize: "1.2rem",
                fontFamily: "inherit",
                marginTop: "1rem",
              }}
            >
              Decline
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HiringRequestDetails;
