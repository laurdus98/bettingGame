import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export function Events(props) {
  const classes = useStyles();
  const { leagueById } = props;
  console.log(_.map(props.EventiAPI[leagueById].events, "event.start_time"));

  const linkToMatches = (idLeague, idEvent) => event => {
    event.preventDefault();
    window.location.href = `/league/${idLeague}/event/${idEvent}/matches`;
  };

  const infoById = id => event => {
    event.preventDefault();
    window.location.href = `/event/${id}`;
  };

  return props.EventiAPI[leagueById].events.map(el => (
    <Card key={el.event.idEvent} className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Event of the Day
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          onClick={infoById(el.event.idEvent)}
        >
          {el.event.start_time.split(".").join("-")}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Matches Days
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={linkToMatches(leagueById, el.event.idEvent)}
        >
          Vedi altro....
        </Button>
      </CardActions>
    </Card>
  ));
}
