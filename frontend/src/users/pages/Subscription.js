import React, { useContext } from "react";
import { UserContext } from "../../shared/context/user-context";
import "./Subscription.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Subscription = (props) => {
  const userAuth = useContext(UserContext);
  if (userAuth.subscription === null) {
    return (
      <div className='subscription-detail'>
        <div className='subscription-title'>
          Momentan nu aveti niciun abonament cumparat
        </div>
        <Link to={`/${userAuth.userId}/addsubscription`}>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            id='muibtn'
            variant='contained'
            style={{
              backgroundColor: "#0e1111",
              color: "#f3f3f3",
              height: "3rem",
              fontSize: "1.2rem",
              fontFamily: "inherit",
              marginTop: "1rem",
            }}
          >
            Vezi toate abonamentele
          </Button>
        </Link>
      </div>
    );
  } else {
    return <div className='subscription-detail'>Abonamentul exista</div>;
  }
};

export default Subscription;
