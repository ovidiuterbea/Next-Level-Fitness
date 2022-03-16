import React, { useState, useEffect } from "react";
import TrainerList from "../components/TrainerList";

const AddPersonalTrainer = () => {
  const [loadedTrainersFetch, setLoadedTrainersFetch] = useState();
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/trainers/`);
        const data = await response.json();
        setLoadedTrainersFetch(data.trainers);
      } catch (err) {}
    };
    fetchTrainers();
  }, []);
  if (loadedTrainersFetch) {
    console.log(loadedTrainersFetch);
  }
  return (
    <React.Fragment>
      {loadedTrainersFetch && <TrainerList items={loadedTrainersFetch} />}
    </React.Fragment>
  );
};

export default AddPersonalTrainer;
