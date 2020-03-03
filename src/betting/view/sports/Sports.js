import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { StarBorder } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.contrastText
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

export function Sports(props) {
  const classes = useStyles();
  console.log(_.map(props.SportAPI.sports, "sport.nome"));
  const infoById = id => event => {
    event.preventDefault();
    window.location.href = `sport/${id}`;
  };
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        {props.SportAPI.sports.map(el => (
          <GridListTile key={el.sport.img}>
            <img src={el.sport.img} alt={el.sport.nome} />
            <Link to={`/sport/${el.sport.idSport}/leagues`}>
              <GridListTileBar
                title={el.sport.nome}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  <IconButton
                    aria-label={`star ${el.sport.nome}`}
                    onClick={infoById(el.sport.idSport)}
                  >
                    <StarBorder className={classes.title} />
                  </IconButton>
                }
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
