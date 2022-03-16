import React from "react";
import TrainerItem from "./TrainerItem";

const TrainerList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='subscription-detail'>
        <h2>No trainers found!</h2>
      </div>
    );
  }

  return (
    <ul className='card-user'>
      {props.items.map((trainer) => {
        return (
          <TrainerItem
            key={trainer.id}
            id={trainer.id}
            name={trainer.name}
            surname={trainer.surname}
            experience={trainer.experience}
          />
        );
      })}
    </ul>
  );
};

export default TrainerList;
