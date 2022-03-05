import "./HiringRequestDetails.css";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import imgHolder from "../../media/trainer-bazat.jpeg";
import { useHistory } from "react-router-dom";

const HiringRequestDetails = (props) => {
  const hiringRequestId = useParams().hiringrequestid;
  const [loadedHiringRequestFetch, setLoadedHiringRequestFetch] = useState();
  const [readableDate, setReadableDate] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getHiringRequest = async () => {
      const response = await fetch(
        `http://localhost:8080/api/hiring/${hiringRequestId}`
      );
      const data = await response.json();
      setLoadedHiringRequestFetch(data);
    };
    getHiringRequest();
  }, [hiringRequestId]);

  useEffect(() => {
    if (loadedHiringRequestFetch) {
      const nonReadableDate =
        loadedHiringRequestFetch.hiringRequest.birthdate.slice(0, 10);

      let parts = nonReadableDate.split("-");
      let myDate = new Date(parts[0], parts[1] - 1, parts[2]);
      setReadableDate(myDate.toDateString().slice(4));
    }
  }, [loadedHiringRequestFetch]);

  const deleteHiringRequest = async () => {
    await fetch(`http://localhost:8080/api/hiring/${hiringRequestId}`, {
      method: "DELETE",
    });
    history.push("/hiringrequests");
  };

  return (
    <React.Fragment>
      {loadedHiringRequestFetch && (
        <div className='hiring-detail'>
          <div className='center'>
            <h2 className='hiring-title'>Canditate Details</h2>
          </div>
          <div className='hiring-flex-container'>
            <div className='hiring-information'>
              <h3>
                Name and surname: {loadedHiringRequestFetch.hiringRequest.name}{" "}
                {loadedHiringRequestFetch.hiringRequest.surname}
              </h3>
              <h3>Birthdate: {readableDate}</h3>
              <h3>
                Experience:{" "}
                {loadedHiringRequestFetch.hiringRequest.experience ===
                  "Entry Level" && (
                  <span className='hiring-experience__entry'>Entry Level</span>
                )}
                {loadedHiringRequestFetch.hiringRequest.experience ===
                  "Middle Level" && (
                  <span className='hiring-experience__middle'>
                    Middle Level
                  </span>
                )}
                {loadedHiringRequestFetch.hiringRequest.experience ===
                  "Senior Level" && (
                  <span className='hiring-experience__senior'>
                    Senior Level
                  </span>
                )}
              </h3>
              <h3>Email: {loadedHiringRequestFetch.hiringRequest.email}</h3>
              <h3>
                Phone number: {loadedHiringRequestFetch.hiringRequest.phone}
              </h3>
              <h3>Address: {loadedHiringRequestFetch.hiringRequest.address}</h3>
              <h3>
                Description:{" "}
                {loadedHiringRequestFetch.hiringRequest.description}
              </h3>
            </div>
            <div className='hiring-photo'>
              <img
                alt='Canditate'
                className='image-center'
                src={imgHolder}
              ></img>
            </div>
          </div>
          <div className='hiring-buttons'>
            <Button className='btn-accept' variant='outlined' size='large'>
              Accept
            </Button>
            <Button
              className='btn-decline'
              variant='outlined'
              size='large'
              onClick={deleteHiringRequest}
            >
              Decline
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HiringRequestDetails;
