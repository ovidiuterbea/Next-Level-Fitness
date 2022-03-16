import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const UserTrainer = (props) => {
  const [loadedClientFetch, setLoadedClientFetch] = useState();
  const clientId = useParams().clientid;
  const history = useHistory();

  useEffect(() => {
    const getClients = async () => {
      const response = await fetch(
        `http://localhost:8080/api/clients/${clientId}`
      );
      const data = await response.json();
      setLoadedClientFetch(data.client);
    };
    getClients();
  }, [clientId]);

  return (
    <React.Fragment>
      {loadedClientFetch && loadedClientFetch.personalTrainer === null && (
        <div className='normal-card' style={{ color: "#0e1111" }}>
          <h2>Nu aveti niciun antrenor personal ales.</h2>
          <Button
            className='btn-accept'
            variant='contained'
            style={{
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
              backgroundColor: "green",
            }}
            startIcon={<FitnessCenterIcon />}
            onClick={() => {
              history.push(`/${clientId}/trainer/addtrainer`);
            }}
          >
            Catre pagina de antrenori personali
          </Button>
        </div>
      )}
      {loadedClientFetch && loadedClientFetch.personalTrainer && (
        <div className='normal-card' style={{ color: "#0e1111" }}>
          <h2>Aveti antrenor personal ales.</h2>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserTrainer;
