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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

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

    try {
      await fetch("http://localhost:8080/api/hiring/", {
        method: "post",
        body: data,
      });
    } catch (err) {
      console.log(err);
    }

    setEnteredName("");
    setEnteredSurname("");
    setEnteredAddress("");
    setEnteredDescription("");
    setEnteredBirthday("");
    setEnteredEmail("");
    setEnteredExperience("");
    setEnteredPhone("");

    setOpen(true);

    // console.log(hiringRequest);
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
