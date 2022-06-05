import React from "react";
import { useEffect, useState } from "react";
import HiringList from "../components/HiringList";
import { Typography } from "@mui/material";

const HiringRequests = (props) => {
  const [loadedHiringRequestsFetch, setLoadedHiringRequestsFetch] = useState();

  const getHiringRequests = async () => {
    const response = await fetch(`http://localhost:8080/api/hiring/`);
    const data = await response.json();
    setLoadedHiringRequestsFetch(data);
  };

  useEffect(() => {
    getHiringRequests();
  }, []);

  return (
    <React.Fragment>
      <Typography
        padding='1rem'
        variant='h3'
        align='center'
        color='#ffef00'
        style={{ marginTop: "5rem" }}
        fontFamily='inherit'
      >
        Cereri de angajare antrenori
      </Typography>
      {loadedHiringRequestsFetch && (
        <HiringList items={loadedHiringRequestsFetch} />
      )}
    </React.Fragment>
  );
};

export default HiringRequests;
