import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./PaymentConfirmation.css";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PaymentConfirmation = (props) => {
  const [loadedClientFetch, setLoadedClientFetch] = useState();
  const clientId = useParams().clientid;
  const history = useHistory();

  useEffect(() => {
    const getClient = async () => {
      const response = await fetch(
        `http://localhost:8000/api/clients/${clientId}`
      );
      const data = await response.json();
      setLoadedClientFetch(data.client);
    };
    getClient();
  }, [clientId]);

  return (
    <React.Fragment>
      {loadedClientFetch && (
        <div className='normal-card' style={{ color: "#0e1111" }}>
          <h2>
            {loadedClientFetch.name} {loadedClientFetch.surname} a achitat
            abonamentul.
          </h2>
          <Button
            className='btn-accept'
            variant='contained'
            style={{
              height: "3rem",
              fontSize: "2vh",
              fontFamily: "inherit",
              marginTop: "1rem",
              backgroundColor: "green",
            }}
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              history.push("/payments");
            }}
          >
            BAck to payment page.
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default PaymentConfirmation;
