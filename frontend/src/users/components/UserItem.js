import React from "react";
import { Button } from "@mui/material";
import "./UserItem.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const UserItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const { sendRequest } = useHttpClient();
  const history = useHistory();

  const deletePaymentHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:8080/api/clients/${props.id}/payment`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      handleClick();
      history.push(`/payments/${props.id}`);
    } catch (err) {}
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Plata a fost efectuata!
        </Alert>
      </Snackbar>
      <li className='user-item'>
        {props.mustPay === true && props.subscription === "bronze" && (
          <h1 className='hiring-name'>
            {props.name} {props.surname} are de platit suma de 150 RON.
          </h1>
        )}
        {props.mustPay === true && props.subscription === "silver" && (
          <h1 className='hiring-name'>
            {props.name} {props.surname} are de platit suma de 175 RON.
          </h1>
        )}
        {props.mustPay === true && props.subscription === "gold" && (
          <h1 className='hiring-name'>
            {props.name} {props.surname} are de platit suma de 200 RON.
          </h1>
        )}
        {props.mustPay === true && props.subscription === "platinum" && (
          <h1 className='hiring-name'>
            {props.name} {props.surname} are de platit suma de 250 RON.
          </h1>
        )}
        {props.mustPay === true && (
          <div className='user__buttons'>
            <Button
              className='btn-accept'
              variant='contained'
              style={{
                height: "3rem",
                fontSize: "1.2rem",
                fontFamily: "inherit",
                marginTop: "1rem",
                backgroundColor: "green",
              }}
              onClick={deletePaymentHandler}
            >
              Confirma plata
            </Button>
          </div>
        )}
      </li>
    </React.Fragment>
  );
};

export default UserItem;
