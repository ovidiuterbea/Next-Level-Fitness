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
} from "@devexpress/dx-react-scheduler-material-ui";

const Classes = (props) => {
  const [loadedClassesFetch, setLoadedClassesFetch] = useState();

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch(`http://localhost:8080/api/classes/`);
      const data = await response.json();
      setLoadedClassesFetch(data);
    };
    getClasses();
  }, []);

  return (
    <React.Fragment>
      {loadedClassesFetch && (
        <Paper>
          <Scheduler height='auto' data={loadedClassesFetch.classes}>
            <EditingState allow />
            <ViewState />
            <WeekView startDayHour={9} endDayHour={21} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
              showCloseButton
              showOpenButton
              showDeleteButton
            />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Classes;
