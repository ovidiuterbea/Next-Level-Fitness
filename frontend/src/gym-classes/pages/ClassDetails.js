import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

//images
import allbody from "../../media/clase/allbody.jpg";
import bagbox from "../../media/clase/bagbox.jpg";
import circuit from "../../media/clase/circuit.jpg";
import crossfit from "../../media/clase/crossfit.jpg";
import cycling from "../../media/clase/cycling.jpg";
import hiit from "../../media/clase/hiit.jpg";
import hoop from "../../media/clase/hoop.jpg";
import interval from "../../media/clase/interval.jpg";
import pilates from "../../media/clase/pilates.jpg";
import pump from "../../media/clase/pump.jpg";
import yoga from "../../media/clase/yoga.jpg";
import zumba from "../../media/clase/zumba.jpg";

const ClassDetails = (props) => {
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose fullWidth>
        <DialogTitle>Detalii clasa de fitness</DialogTitle>
        <DialogContent>
          <Card>
            {props.title === "All body workout" && (
              <CardMedia
                component='img'
                height='250'
                image={allbody}
                alt='class photo'
              />
            )}
            {props.title === "Bag box" && (
              <CardMedia
                component='img'
                height='250'
                image={bagbox}
                alt='class photo'
              />
            )}
            {props.title === "Circuit" && (
              <CardMedia
                component='img'
                height='250'
                image={circuit}
                alt='class photo'
              />
            )}
            {props.title === "Crossfit" && (
              <CardMedia
                component='img'
                height='250'
                image={crossfit}
                alt='class photo'
              />
            )}
            {props.title === "Cycling" && (
              <CardMedia
                component='img'
                height='250'
                image={cycling}
                alt='class photo'
              />
            )}
            {props.title === "HIIT" && (
              <CardMedia
                component='img'
                height='250'
                image={hiit}
                alt='class photo'
              />
            )}
            {props.title === "Hula hooping" && (
              <CardMedia
                component='img'
                height='250'
                image={hoop}
                alt='class photo'
              />
            )}
            {props.title === "Interval" && (
              <CardMedia
                component='img'
                height='250'
                image={interval}
                alt='class photo'
              />
            )}
            {props.title === "Pilates" && (
              <CardMedia
                component='img'
                height='250'
                image={pilates}
                alt='class photo'
              />
            )}
            {props.title === "Pump" && (
              <CardMedia
                component='img'
                height='250'
                image={pump}
                alt='class photo'
              />
            )}
            {props.title === "Yoga" && (
              <CardMedia
                component='img'
                height='250'
                image={yoga}
                alt='class photo'
              />
            )}
            {props.title === "Zumba" && (
              <CardMedia
                component='img'
                height='250'
                image={zumba}
                alt='class photo'
              />
            )}
            <CardContent>
              <Typography variant='h4'>{props.title}</Typography>
              <Typography>{props.difficultyLevel}</Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ClassDetails;
