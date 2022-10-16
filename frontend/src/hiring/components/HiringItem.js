import React from "react";
import { Link } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import "./HiringItem.css";

const HiringItem = (props) => {
  return (
    <li className='hiring-item'>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className='hiring-name'>
          {props.name} {props.surname}
        </h1>
        <Avatar
          alt='Potential trainer photo'
          src={`http://localhost:8000/${props.image}`}
          sx={{ height: 50, width: 50 }}
        />
      </div>
      <div className='hiring-item__buttons'>
        <Link to={`/hiringrequests/${props.id}`}>
          <Button id='muibtn'>View Candidate Details</Button>
        </Link>
      </div>
    </li>
  );
};

export default HiringItem;
