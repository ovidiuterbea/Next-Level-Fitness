import React, { useEffect } from "react";
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
  Autocomplete,
} from "@mui/material";
import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
const moment = require("moment");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const HiringForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState(new Date());
  const [enteredEndDate, setEnteredEndDate] = useState(new Date());
  const [enteredTrainer, setEnteredTrainer] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [enteredDifficultyLevel, setEnteredDifficultyLevel] = useState("");
  const [loadedTrainersFetch, setLoadedTrainersFetch] = useState();
  const [open, setOpen] = React.useState(false);
  const [mesaj, setMesaj] = useState("");
  const [severity, setSeverity] = useState("success");
  const history = useHistory();
  const { sendRequest, error } = useHttpClient();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/trainers/`);
        const data = await response.json();
        setLoadedTrainersFetch(data);
      } catch (err) {}
    };
    fetchTrainers();
  }, []);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value === "Pump") {
      setEnteredDifficultyLevel("Easy");
    }
    if (event.target.value === "HIIT") {
      setEnteredDifficultyLevel("Hard");
    }
    if (event.target.value === "Zumba") {
      setEnteredDifficultyLevel("Easy");
    }
    if (event.target.value === "All body workout") {
      setEnteredDifficultyLevel("Intermediate");
    }
    if (event.target.value === "Yoga") {
      setEnteredDifficultyLevel("Easy");
    }
    if (event.target.value === "Cycling") {
      setEnteredDifficultyLevel("Intermediate");
    }
    if (event.target.value === "Bag box") {
      setEnteredDifficultyLevel("Hard");
    }
    if (event.target.value === "Crossfit") {
      setEnteredDifficultyLevel("Easy");
    }
    if (event.target.value === "Pilates") {
      setEnteredDifficultyLevel("Easy");
    }
    if (event.target.value === "Interval") {
      setEnteredDifficultyLevel("Intermediate");
    }
    if (event.target.value === "Circuit") {
      setEnteredDifficultyLevel("Hard");
    }
    if (event.target.value === "Hula hooping") {
      setEnteredDifficultyLevel("Easy");
    }
  };

  const enteredTrainerChangeHandler = (event) => {
    setEnteredTrainer(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    if (severity === "success") {
      history.push("/classes");
    }
  };

  const formHandler = async (event) => {
    event.preventDefault();

    let now = moment();

    const sDate = new Date(enteredStartDate);
    const eDate = new Date(enteredEndDate);

    if (sDate < now || sDate > eDate) {
      setMesaj("Data inceperii clasei este in trecut");
      setSeverity("error");
      handleClick();
      return;
    }

    const hours = Math.abs(eDate - sDate) / 36e5;

    if (hours > 2) {
      setMesaj("Durata clasei este mai mare de 2 ore!");
      setSeverity("error");
      handleClick();
      return;
    }

    try {
      await sendRequest(
        "http://localhost:8080/api/classes/",
        "POST",
        JSON.stringify({
          title: enteredName,
          startDate: enteredStartDate.toISOString(),
          endDate: enteredEndDate.toISOString(),
          trainer: trainerId,
          difficultyLevel: enteredDifficultyLevel,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setMesaj("Ati creat clasa de fitness cu succes");
      setSeverity("success");
      handleClick();
    } catch (err) {}
  };

  const theme = createTheme({
    palette: {
      primary: grey,
    },
  });

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {mesaj}
        </Alert>
      </Snackbar>
      {loadedTrainersFetch && (
        <div>
          <Typography
            padding='1rem'
            variant='h3'
            align='center'
            color='#f3f3f3'
            style={{ fontFamily: "inherit", paddingTop: "5rem" }}
          >
            Add a new gym class
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
                        <FormControl fullWidth>
                          <InputLabel id='selectNameLabel'>Name</InputLabel>
                          <Select
                            labelId='selectNameLabel'
                            id='selectName'
                            label='Name'
                            onChange={nameChangeHandler}
                            fullWidth
                            variant='outlined'
                            required
                            value={enteredName}
                          >
                            <MenuItem value='Pump'>Pump</MenuItem>
                            <MenuItem value='HIIT'>HIIT</MenuItem>
                            <MenuItem value='Zumba'>Zumba</MenuItem>
                            <MenuItem value='All body workout'>
                              All body workout
                            </MenuItem>
                            <MenuItem value='Yoga'>Yoga</MenuItem>
                            <MenuItem value='Cycling'>Cycling</MenuItem>
                            <MenuItem value='Bag box'>Bag box</MenuItem>
                            <MenuItem value='Crossfit'>Crossfit</MenuItem>
                            <MenuItem value='Pilates'>Pilates</MenuItem>
                            <MenuItem value='Interval'>Interval</MenuItem>
                            <MenuItem value='Circuit'>Circuit</MenuItem>
                            <MenuItem value='Hula hooping'>
                              Hula hooping
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid xs={10} item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField {...props} fullWidth />
                            )}
                            label='Start date'
                            onChange={(newValue) => {
                              setEnteredStartDate(newValue);
                            }}
                            value={enteredStartDate}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid xs={10} item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField {...props} fullWidth />
                            )}
                            label='End date'
                            onChange={(newValue) => {
                              setEnteredEndDate(newValue);
                            }}
                            value={enteredEndDate}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid xs={10} item>
                        <Autocomplete
                          options={loadedTrainersFetch.trainers}
                          getOptionLabel={(option) =>
                            option.name + " " + option.surname
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <TextField
                                inputProps={{ ...params.inputProps }}
                                placeholder='Select trainer for this class'
                                label='Trainer'
                                variant='outlined'
                                fullWidth
                                onBlur={enteredTrainerChangeHandler}
                                value={enteredTrainer}
                              />
                            </div>
                          )}
                          onChange={(event, newValue) => {
                            if (newValue !== null) {
                              setTrainerId(newValue.id);
                            }
                          }}
                        />
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
        </div>
      )}
    </React.Fragment>
  );
};

export default HiringForm;
