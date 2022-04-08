import React, { useEffect, useState } from "react";

const Statistics = (props) => {
  const [loadedTrainersFetch, setLoadedTrainersFetch] = useState();
  const [loadedClassesFetch, setLoadedClassesFetch] = useState();
  const [loadedClientsFetch, setLoadedClientsFetch] = useState();

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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/classes/`);
        const data = await response.json();
        setLoadedClassesFetch(data.classes);
      } catch (err) {}
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/clients/`);
        const data = await response.json();
        setLoadedClientsFetch(data.clients);
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
      Acesta este pagina de statistics
    </div>
  );
};

export default Statistics;
