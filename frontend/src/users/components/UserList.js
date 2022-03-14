import React from "react";
import UserItem from "./UserItem";
import "./UserList.css";

const UserList = (props) => {
  if (props.items.clients.length === 0) {
    return (
      <div className='subscription-detail'>
        <h2>No Payments from clients found!</h2>
      </div>
    );
  }

  let mustPayCondition;
  return (
    <ul className='card-user'>
      {props.items.clients.map((client) => {
        if (client.mustPay === true) {
          mustPayCondition = true;
        }
        return (
          <UserItem
            key={client.id}
            id={client.id}
            name={client.name}
            surname={client.surname}
            mustPay={client.mustPay}
            image={client.image}
            birthdate={client.birthdate}
            address={client.address}
            subscription={client.subscription}
            mustPayCondition={mustPayCondition}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
