import React from "react";
import HiringItem from "./HiringItem";
import "./HiringList.css";

const HiringList = (props) => {
  if (props.items.hirings.length === 0) {
    return (
      <div className='subscription-detail'>
        <h2>Nicio cerere de angajare gasita.</h2>
      </div>
    );
  }

  return (
    <ul className='card'>
      {props.items.hirings.map((hiring) => {
        return (
          <HiringItem
            key={hiring.id}
            id={hiring.id}
            name={hiring.name}
            surname={hiring.surname}
          />
        );
      })}
    </ul>
  );
};

export default HiringList;
