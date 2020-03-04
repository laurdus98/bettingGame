import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  makeStyles,
  CssBaseline,
  Container
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

export function Home(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Benvenuto, {props.token}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"Betting Game Using Development's ReactJS "}
            {"Betting's Evolubile Game "}
          </Typography>
          <Typography variant="body1">
            <Link to="/sports">Enter Sports</Link>
          </Typography>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">
              <Link to="/logout">
                <ExitToAppIcon style={{ fontSize: 40 }} />
              </Link>
            </Typography>
          </Container>
        </footer>
      </div>
    </Fragment>
  );
}
