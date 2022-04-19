import React from "react";
import UserItem from "./UserItem";
import "./UserList.css";

const UserList = (props) => {
  if (
    props.items.clients.filter((client) => client.mustPay === true).length === 0
  ) {
    return (
      <div className='normal-card-black'>
        <h2>Nicio plata nu trebuie efectuata.</h2>
      </div>
    );
  } else
    return (
      <ul className='card-user'>
        {props.items.clients
          .filter((client) => client.mustPay === true)
          .map((client) => {
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
              />
            );
          })}
      </ul>
    );
};

export default UserList;
