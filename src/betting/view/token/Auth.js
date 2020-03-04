import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  Typography
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://serambigayo.com/wp-content/uploads/2019/11/sportsbetting-1.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function Auth(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMount, setMount] = useState(true);

  function onChangeText(e) {
    const { target } = e;
    const { name, value } = target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
    }
    console.log(email, password);
  }

  function checkLogin(e) {
    e.preventDefault();
    const { auth, pass } = props.token;
    if (email && password) {
      if (
        email.toLowerCase() === auth.toLowerCase() &&
        btoa(password) === pass
      ) {
        saveToken(email, password);
        window.location.href = "/";
      }
    } else {
      return;
    }
  }

  function saveToken(email, pass) {
    localStorage.setItem(
      "token",
      JSON.stringify({ auth: email, pass: btoa(pass) })
    );
  }

  useEffect(() => {
    if (localStorage.getItem("token") && isMount) {
      setMount(false);
      window.location.href = "/";
    }
  }, [isMount, setMount]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeText}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeText}
              password={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={checkLogin}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
