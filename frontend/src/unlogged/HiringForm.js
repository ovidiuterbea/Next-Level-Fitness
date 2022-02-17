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

const HiringForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredBirthday, setEnteredBirthday] = useState("");
  const [enteredExperience, setEnteredExperience] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

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

  const formHandler = async (event) => {
    event.preventDefault();

    const hiringRequest = {
      name: enteredName,
      surname: enteredSurname,
      address: enteredAddress,
      description: enteredDescription,
      birthdate: enteredBirthday,
      email: enteredEmail,
      experience: enteredExperience,
    };

    console.log(hiringRequest);
  };

  const theme = createTheme({
    palette: {
      primary: grey,
    },
  });

  return (
    <React.Fragment>
      <Typography
        padding="1rem"
        variant="h3"
        align="center"
        color="#f3f3f3"
        style={{ fontFamily: "inherit", paddingTop: "5rem" }}
      >
        Vrei sa te alaturi ca antrenor?
      </Typography>
      <Typography
        padding="1rem"
        variant="h4"
        align="center"
        color="#f3f3f3"
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
          }}
        >
          <CardContent>
            <form onSubmit={formHandler}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <ThemeProvider theme={theme}>
                  <Grid xs={10} item>
                    <TextField
                      placeholder="Enter your name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={nameChangeHandler}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder="Enter your surname"
                      label="Surname"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={surnameChangeHandler}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      type="email"
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={emailChangeHandler}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder="Enter your address"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={addressChangeHandler}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      id="date"
                      label="Birthday"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={birthdayChangeHandler}
                    />
                  </Grid>
                  <Grid xs={10} item>
                    <FormControl fullWidth>
                      <InputLabel id="selectExperinceLabel">
                        Experience
                      </InputLabel>
                      <Select
                        labelId="selectExperienceLabel"
                        id="selectExperience"
                        label="Experience"
                        onChange={experienceChangeHandler}
                        value={enteredExperience}
                        fullWidth
                        variant="outlined"
                        required
                      >
                        <MenuItem value="Entry-Level">{`Entry-Level (<2 ani)`}</MenuItem>
                        <MenuItem value="Middle-Level">{`Middle-Level (2-4 ani) `}</MenuItem>
                        <MenuItem value="Senior-Level">{`Senior Level (4+ ani)`}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={10} item>
                    <TextField
                      placeholder="Enter your description"
                      label="Description"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={4}
                      onChange={descriptionChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        backgroundColor: "#0e1111",
                        height: "4rem",
                        fontSize: "1.5rem",
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
