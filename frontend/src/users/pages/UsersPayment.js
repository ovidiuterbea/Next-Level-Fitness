import React from "react";
import { useEffect, useState } from "react";
import UserList from "../components/UserList";

const UsersPayment = (props) => {
  const [loadedClientsFetch, setLoadedClientsFetch] = useState();

  const getClients = async () => {
    const response = await fetch(`http://localhost:8000/api/clients/`);
    const data = await response.json();
    setLoadedClientsFetch(data);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <React.Fragment>
      {loadedClientsFetch && <UserList items={loadedClientsFetch} />}
    </React.Fragment>
  );
};

export default UsersPayment;
