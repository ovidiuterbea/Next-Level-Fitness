import React from "react";
import { useState } from "react";
import {
  Card,
  TextField,
  CardContent,
  Grid,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useHttpClient } from "../shared/hooks/http-hook";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

const HiringForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredBirthday, setEnteredBirthday] = useState("");
  const [enteredExperience, setEnteredExperience] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const { sendRequest } = useHttpClient();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setEnteredSurname(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const birthdayChangeHandler = (event) => {
    setEnteredBirthday(event.target.value);
  };

  const experienceChangeHandler = (event) => {
    setEnteredExperience(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  const demoHandler = () => {
    setEnteredName("Terbea");
    setEnteredSurname("Ovidiu Cristian");
    setEnteredAddress("Aleea Stanila nr. 2");
    setEnteredDescription(
      "Mereu pasionat de fitness si sa ajut oameni, consider ca acest rol mi se potriveste la perfectie!"
    );
    setEnteredBirthday("2000-05-09");
    setEnteredEmail("terbeaovidiu19@stud.ase.ro");
    setEnteredExperience("Senior Level");
    setEnteredPhone("0734350652");
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", enteredName);
    data.append("surname", enteredSurname);
    data.append("address", enteredAddress);
    data.append("description", enteredDescription);
    data.append("birthdate", enteredBirthday);
    data.append("email", enteredEmail);
    data.append("experience", enteredExperience);
    data.append("phone", enteredPhone);
    data.append("image", image);

    if (enteredPhone.length !== 10 || onlyLetters(enteredPhone) === true) {
      setMesaj("Numar de telefon invalid.");
      setSeverity("error");
      handleClick();
      return;
    }

    let currentDate = new Date();
    const birthdayDate = new Date(enteredBirthday);
    const diffTime = Math.abs(currentDate - birthdayDate);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    if (diffYears < 18) {
      setMesaj("Varsta insuficient de mare pentru a fi antrenor.");
      setSeverity("error");
      handleClick();
      return;
    }

    try {
      await sendRequest("http://localhost:8000/api/hiring/", "POST", data);
      setEnteredName("");
      setEnteredSurname("");
      setEnteredAddress("");
      setEnteredDescription("");
      setEnteredBirthday("");
      setEnteredEmail("");
      setEnteredExperience("");
      setEnteredPhone("");

      setOpen(true);
    } catch (err) {}
  };

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const theme = createTheme({
    palette: {
      primary: grey,
    },
  });

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
              Your hiring request has been sent to the administrator.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {mesaj}
        </Alert>
      </Snackbar>
      <Typography
        padding='1rem'
        variant='h3'
        align='center'
        color='#f3f3f3'
        style={{ fontFamily: "inherit", paddingTop: "5rem" }}
      >
        Vrei sa te alaturi ca antrenor?
      </Typography>
      <Typography
        padding='1rem'
        variant='h4'
        align='center'
        color='#f3f3f3'
        style={{ fontFamily: "inherit", marginBottom: "1.5rem" }}
      >
        Trimite datele si te vom chema noi la interviu!
      </Typography>
      <Grid>
        <Card
          style={{
            width: "50%",
            padding: "20px 5px",
            margin: "0 auto",
            marginBottom: "2rem",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Button
              type='button'
              variant='contained'
              color='primary'
              style={{
                backgroundColor: "#f3f3f3",
                height: "4rem",
                fontSize: "3vw",
                fontFamily: "inherit",
                color: "#0e1111",
                position: "absolute",
                right: "0.5rem",
              }}
              onClick={demoHandler}
            >
              Demo
            </Button>
            <form onSubmit={formHandler}>
              <Grid
                container
                spacing={2}
                alignItems='center'
                justifyContent='center'
              >
                <ThemeProvider theme={theme}>
                  <Grid xs={10} item>
                    <TextField
                      placeholder='Enter your name'
                      label='Name'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={nameChangeHandler}
                      value={enteredName}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder='Enter your surname'
                      label='Surname'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={surnameChangeHandler}
                      value={enteredSurname}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder='Enter your phone number'
                      label='Phone number'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={phoneChangeHandler}
                      value={enteredPhone}
                      type='number'
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      type='email'
                      placeholder='Enter email'
                      label='Email'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={emailChangeHandler}
                      value={enteredEmail}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder='Enter your address'
                      label='Address'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={addressChangeHandler}
                      value={enteredAddress}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      id='date'
                      label='Birthday'
                      type='date'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={birthdayChangeHandler}
                      value={enteredBirthday}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <FormControl fullWidth>
                      <InputLabel id='selectExperinceLabel'>
                        Experience
                      </InputLabel>
                      <Select
                        labelId='selectExperienceLabel'
                        id='selectExperience'
                        label='Experience'
                        onChange={experienceChangeHandler}
                        value={enteredExperience}
                        fullWidth
                        variant='outlined'
                        required
                      >
                        <MenuItem value='Entry Level'>{`Entry Level (<2 ani)`}</MenuItem>
                        <MenuItem value='Middle Level'>{`Middle Level (2-4 ani) `}</MenuItem>
                        <MenuItem value='Senior Level'>{`Senior Level (4+ ani)`}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder='Enter your description'
                      label='Description'
                      variant='outlined'
                      fullWidth
                      required
                      multiline
                      rows={4}
                      onChange={descriptionChangeHandler}
                      value={enteredDescription}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <label htmlFor='file'>Profile picture </label>
                    <input
                      type='file'
                      id='file'
                      accept='.jpg,.png,.jpeg'
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setImage(file);
                      }}
                    ></input>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth
                      style={{
                        backgroundColor: "#0e1111",
                        height: "4rem",
                        fontSize: "3vw",
                        fontFamily: "inherit",
                        color: "#ffef00",
                        marginTop: "2rem",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </ThemeProvider>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default HiringForm;
