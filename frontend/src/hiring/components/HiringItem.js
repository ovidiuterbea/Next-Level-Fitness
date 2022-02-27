import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./HiringItem.css";

const HiringItem = (props) => {
  return (
    <li className='hiring-item'>
      <h1 className='hiring-name'>
        {props.name} {props.surname}
      </h1>
      <div className='hiring-item__buttons'>
        <Link to={`/hiringrequests/${props.id}`}>
          <Button id='muibtn'>View Candidate Details</Button>
        </Link>
      </div>
    </li>
  );
};

export default HiringItem;
