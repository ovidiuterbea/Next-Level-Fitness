import React, { useState, useEffect, useContext } from "react";
import { Paper, Grid, IconButton } from "@mui/material";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveIcon from "@mui/icons-material/Remove";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { UserContext } from "../../shared/context/user-context";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const UserClasses = (props) => {
  const [loadedClassesFetch, setLoadedClassesFetch] = useState();
  const [loadedTrainersFetch, setLoadedTrainersFetch] = useState();
  const [open, setOpen] = React.useState(false);
  const [mesaj, setMesaj] = useState("");
  const [severity, setSeverity] = useState("success");
  const { sendRequest, error } = useHttpClient();
  const userAuth = useContext(UserContext);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch(`http://localhost:8080/api/classes/`);
      const data = await response.json();
      for (const gymClass of data.classes) {
        gymClass.startDate = new Date(gymClass.startDate);
        gymClass.endDate = new Date(gymClass.endDate);
      }
      setLoadedClassesFetch(data.classes);
    };
    getClasses();
  }, []);

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

  const Header = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <IconButton
        onClick={async () => {
          try {
            await sendRequest(
              `http://localhost:8080/api/clients/${userAuth.userId}/class`,
              "PATCH",
              JSON.stringify({
                classId: appointmentData.id,
              }),
              {
                "Content-Type": "application/json",
              }
            );
            setMesaj("V-ati alaturat cu succes la aceasta clasa de fitness!");
            setSeverity("success");
            handleClick();
          } catch (err) {
            setSeverity("error");
            setMesaj(error);
            handleClick();
          }
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton
        onClick={async () => {
          try {
            await sendRequest(
              `http://localhost:8080/api/clients/${userAuth.userId}/classDel`,
              "PATCH",
              JSON.stringify({
                classId: appointmentData.id,
              }),
              {
                "Content-Type": "application/json",
              }
            );
            setMesaj("V-ati retras cu success din aceasta clasa de fitness.");
            setSeverity("success");
            handleClick();
          } catch (err) {
            setMesaj(error);
            setSeverity("warning");
            handleClick();
          }
        }}
      >
        <RemoveIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  );

  const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems='center'>
        <Grid item xs={2} textAlign='center'>
          <PersonIcon />
        </Grid>
        <Grid item xs={10}>
          {JSON.stringify(
            loadedTrainersFetch.trainers.find(
              (trainer) => trainer.id === appointmentData.trainer
            )
          )
            .slice(42, 80)
            .replace("address", "")
            .replace("surname", "")
            .replace(",", "")
            .replace(",", "")
            .replace('"""', " ")
            .replace('""', "")
            .replace(':"', "")
            .replace('":', "")}
        </Grid>
      </Grid>
      {JSON.stringify(appointmentData).includes(userAuth.userId) && (
        <Grid container alignItems='center'>
          <Grid item xs={2} textAlign='center'>
            <PersonIcon />
          </Grid>
          <Grid item xs={10}>
            Sunteti alocat acestei clase
          </Grid>
        </Grid>
      )}
    </AppointmentTooltip.Content>
  );

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {mesaj}
        </Alert>
      </Snackbar>
      {loadedClassesFetch && (
        <Paper>
          <Scheduler height='auto' data={loadedClassesFetch}>
            <ViewState />
            <EditingState />
            <WeekView startDayHour={9} endDayHour={21} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
              showCloseButton
              headerComponent={Header}
              contentComponent={Content}
            />
            <ConfirmationDialog />
          </Scheduler>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default UserClasses;
