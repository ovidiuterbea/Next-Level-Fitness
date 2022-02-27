import React from "react";
import { useEffect, useState } from "react";
import HiringList from "../components/HiringList";

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

  console.log(loadedHiringRequestsFetch);

  return (
    <React.Fragment>
      {loadedHiringRequestsFetch && (
        <HiringList items={loadedHiringRequestsFetch} />
      )}
    </React.Fragment>
  );
};

export default HiringRequests;
