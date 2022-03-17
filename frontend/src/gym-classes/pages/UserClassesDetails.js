import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../shared/context/user-context";

const UserClassesDetails = () => {
  const [loadedClassesFetch, setLoadedClassesFetch] = useState();
  const userAuth = useContext(UserContext);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/classes/client/${userAuth.userId}`
        );
        const data = await response.json();
        setLoadedClassesFetch(data.classes);
      } catch (err) {}
    };
    fetchClasses();
  }, []);

  if (loadedClassesFetch) {
    console.log(loadedClassesFetch);
  }
  return <React.Fragment>Ceva</React.Fragment>;
};

export default UserClassesDetails;
