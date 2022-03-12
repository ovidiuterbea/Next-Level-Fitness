import React from "react";
import { useState, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  //   CircularProgress,
  // Stack,
  // Radio,
  // RadioGroup,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // ThemeProvider,
  ButtonGroup,
  // createTheme,
} from "@mui/material";
import { UserContext } from "../shared/context/user-context";
import { TrainerContext } from "../shared/context/trainer-context";
import { AdminContext } from "../shared/context/admin-context";
// import { useHttpClient } from "../../shared/hooks/http-hook";
// import { grey } from "@mui/material/colors";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const userAuth = useContext(UserContext);
  const trainerAuth = useContext(TrainerContext);
  const adminAuth = useContext(AdminContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredBirthday, setEnteredBirthday] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");

  const [loginType, setLoginType] = useState("user");

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setEnteredSurname(event.target.value);
  };

  const birthdayChangeHandler = (event) => {
    setEnteredBirthday(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const userLoginChangeHandler = () => {
    if (isLoginMode === true) {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
    }
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (loginType === "user" && isLoginMode === true) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/clients/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
            }),
          }
        );
        const data = await response.json();
        if (data.clientId) {
          userAuth.login(data.clientId);
        }
      } catch (err) {}
    }
    if (loginType === "user" && isLoginMode === false) {
      const response = await fetch(`http://localhost:8080/api/clients/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
          password: enteredPassword,
          birthdate: enteredBirthday,
          address: enteredAddress,
        }),
      });
      const data = await response.json();
      userAuth.login(data.clientId);
    }
    if (loginType === "trainer") {
      try {
        const response = await fetch(
          `http://localhost:8080/api/trainers/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
            }),
          }
        );
        const data = await response.json();
        if (data.trainerId) {
          trainerAuth.login(data.trainerId);
        }
      } catch (err) {}
    }
    if (loginType === "admin") {
      if (
        enteredEmail === "nextadmin@gmail.com" &&
        enteredPassword === "admin123"
      ) {
        adminAuth.login();
      }
    }
  };

  // const theme = createTheme({
  //   palette: {
  //     primary: grey,
  //   },
  // });

  return (
    <React.Fragment>
      <div className='App'>
        <Typography padding='1rem' variant='h3' align='center' color='#f3f3f3'>
          {isLoginMode && loginType === "user" && "Login"}
          {!isLoginMode && loginType === "user" && "Signup"}
          {loginType === "trainer" && "Login"}
          {loginType === "admin" && "Login"}
        </Typography>

        <Grid>
          <Card
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: "10px",
              width: "30%",
              padding: "1rem",
              margin: "0 auto",
            }}
          >
            <CardContent>
              <form onSubmit={authSubmitHandler}>
                <Grid
                  container
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                >
                  <Grid item xs={12}>
                    <ButtonGroup variant='contained' fullWidth color='inherit'>
                      <Button
                        id='btnUser'
                        style={{
                          fontFamily: "inherit",
                          fontSize: "1.2rem",
                          backgroundColor: "#0e1111",
                          color: "#ffef00",
                        }}
                        onClick={() => {
                          setLoginType("user");
                          document.getElementById("btnUser").style.color =
                            "#ffef00";
                          document.getElementById("btnTrainer").style.color =
                            "#f3f3f3";
                          document.getElementById("btnAdmin").style.color =
                            "#f3f3f3";
                        }}
                      >
                        User
                      </Button>
                      <Button
                        id='btnTrainer'
                        style={{
                          fontFamily: "inherit",
                          fontSize: "1.2rem",
                          backgroundColor: "#0e1111",
                          color: "#f3f3f3",
                        }}
                        onClick={() => {
                          setLoginType("trainer");
                          setIsLoginMode(true);
                          document.getElementById("btnTrainer").style.color =
                            "#ffef00";
                          document.getElementById("btnUser").style.color =
                            "#f3f3f3";
                          document.getElementById("btnAdmin").style.color =
                            "#f3f3f3";
                        }}
                      >
                        Trainer
                      </Button>
                      <Button
                        id='btnAdmin'
                        style={{
                          fontFamily: "inherit",
                          fontSize: "1.2rem",
                          backgroundColor: "#0e1111",
                          color: "#f3f3f3",
                        }}
                        onClick={() => {
                          setLoginType("admin");
                          setIsLoginMode(true);
                          document.getElementById("btnAdmin").style.color =
                            "#ffef00";
                          document.getElementById("btnUser").style.color =
                            "#f3f3f3";
                          document.getElementById("btnTrainer").style.color =
                            "#f3f3f3";
                        }}
                      >
                        Admin
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  {!isLoginMode && loginType === "user" && (
                    <Grid item xs={12}>
                      <TextField
                        className='textField'
                        type='text'
                        placeholder='Enter name'
                        label='Name'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={nameChangeHandler}
                      />
                    </Grid>
                  )}
                  {!isLoginMode && loginType === "user" && (
                    <Grid item xs={12}>
                      <TextField
                        className='textField'
                        type='text'
                        placeholder='Enter surname'
                        label='Surname'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={surnameChangeHandler}
                      />
                    </Grid>
                  )}
                  {!isLoginMode && loginType === "user" && (
                    <Grid xs={12} item>
                      <TextField
                        id='date'
                        label='Birthday'
                        type='date'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        onChange={birthdayChangeHandler}
                      />
                    </Grid>
                  )}
                  {!isLoginMode && loginType === "user" && (
                    <Grid xs={12} item>
                      <TextField
                        placeholder='Enter your address'
                        label='Address'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={addressChangeHandler}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className='textField'
                      type='email'
                      placeholder='Enter email'
                      label='Email'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={emailChangeHandler}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      className='textField'
                      type='password'
                      placeholder='Enter password'
                      label='Password'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={passwordChangeHandler}
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
                        color: "#f3f3f3",
                        height: "3rem",
                        fontSize: "1.2rem",
                        fontFamily: "inherit",
                        marginTop: "1rem",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {loginType === "user" && (
            <Typography align='center' style={{ marginTop: "1rem" }}>
              <Button
                type=''
                variant='contained'
                color='primary'
                onClick={userLoginChangeHandler}
                style={{ backgroundColor: "#ffef00", color: "#0e1111" }}
              >
                {isLoginMode ? "Sign Up" : "Login"}
              </Button>
            </Typography>
          )}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Auth;
