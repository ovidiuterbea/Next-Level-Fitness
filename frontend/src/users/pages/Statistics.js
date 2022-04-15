import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import PieChart from "../../graphs/PieChart";

const Statistics = (props) => {
  const [loadedTrainersFetch, setLoadedTrainersFetch] = useState();
  const [loadedClassesFetch, setLoadedClassesFetch] = useState();
  const [loadedClientsFetch, setLoadedClientsFetch] = useState();
  const [statisticsType, setStatisticsType] = useState("user");
  const [numberOfBronzeSubs, setNumberOfBronzeSubs] = useState(0);
  const [numberOfSilverSubs, setNumberOfSilverSubs] = useState(0);
  const [numberOfGoldSubs, setNumberOfGoldSubs] = useState(0);
  const [numberOfPlatinumSubs, setNumberOfPlatinumSubs] = useState(0);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/trainers/`);
        const data = await response.json();
        setLoadedTrainersFetch(data.trainers);
      } catch (err) {}
    };
    fetchTrainers();
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/classes/`);
        const data = await response.json();
        setLoadedClassesFetch(data.classes);
      } catch (err) {}
    };
    fetchClasses();
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/clients/`);
        const data = await response.json();
        setLoadedClientsFetch(data.clients);
        for (let client of data.clients) {
          if (client.subscription === "bronze") {
            setNumberOfBronzeSubs((n) => n + 1);
          }
          if (client.subscription === "silver") {
            setNumberOfSilverSubs((n) => n + 1);
          }
          if (client.subscription === "gold") {
            setNumberOfGoldSubs((n) => n + 1);
          }
          if (client.subscription === "platinum") {
            setNumberOfPlatinumSubs((n) => n + 1);
          }
        }
      } catch (err) {}
    };
    fetchClients();
  }, []);

  if (loadedTrainersFetch && loadedClassesFetch && loadedClientsFetch) {
    console.log(loadedTrainersFetch);
    console.log(loadedClassesFetch);
    console.log(loadedClientsFetch);
  }

  return (
    <div
      className='normal-card'
      style={{ color: "#0e1111", width: "80%", minHeight: "60vh" }}
    >
      <ButtonGroup
        variant='contained'
        color='inherit'
        style={{ width: "50%", marginBottom: "2.5rem" }}
        fullWidth
      >
        <Button
          id='btnUser'
          style={{
            fontFamily: "inherit",
            fontSize: "1.2rem",
            backgroundColor: "#0e1111",
            color: "#ffef00",
          }}
          onClick={() => {
            setStatisticsType("user");
            document.getElementById("btnUser").style.color = "#ffef00";
            document.getElementById("btnTrainer").style.color = "#f3f3f3";
          }}
        >
          Clients
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
            setStatisticsType("trainer");
            document.getElementById("btnTrainer").style.color = "#ffef00";
            document.getElementById("btnUser").style.color = "#f3f3f3";
          }}
        >
          Trainers
        </Button>
      </ButtonGroup>
      {statisticsType === "user" && (
        <PieChart
          labels={["Bronze", "Silver", "Gold", "Platinum"]}
          data={[
            numberOfBronzeSubs,
            numberOfSilverSubs,
            numberOfGoldSubs,
            numberOfPlatinumSubs,
          ]}
        />
      )}
    </div>
  );
};

export default Statistics;
