import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  DayView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { styled } from "@mui/material/styles";
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

  // const deleteClassHandler = async () => {
  //   await fetch(`http://localhost:8080/api/hiring/${hiringRequestId}`, {
  //     method: "DELETE",
  //   });
  // };

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
          <Scheduler height='auto' data={loadedClassesFetch}>
            <ViewState />
            <EditingState />
            <WeekView startDayHour={9} endDayHour={21} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip showCloseButton headerComponent={Header} />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Classes;
