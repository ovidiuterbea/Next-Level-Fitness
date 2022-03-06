import React, { useState, useEffect } from "react";
import { Paper, Button, Stack } from "@mui/material";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Link } from "react-router-dom";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Classes = (props) => {
  const [loadedClassesFetch, setLoadedClassesFetch] = useState();

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

  const Header = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <IconButton
        onClick={async () => {
          await fetch(
            `http://localhost:8080/api/classes/${appointmentData.id}`,
            {
              method: "DELETE",
            }
          );
          setLoadedClassesFetch(
            loadedClassesFetch.filter(
              (gymClass) => gymClass.id !== appointmentData.id
            )
          );
        }}
        size='large'
      >
        <DeleteIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  );

  return (
    <React.Fragment>
      {loadedClassesFetch && (
        <Paper>
          <Stack alignItems='center'>
            <Link to={"/newclass"}>
              <Button
                variant='outlined'
                style={{
                  marginTop: "1rem",
                  height: "3rem",
                  backgroundColor: "#0e1111",
                  color: "#ffef00",
                }}
              >
                Add a new class
              </Button>
            </Link>
          </Stack>
          <Scheduler height='auto' data={loadedClassesFetch}>
            <ViewState />
            <WeekView startDayHour={9} endDayHour={21} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip showCloseButton headerComponent={Header} />
          </Scheduler>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Classes;
