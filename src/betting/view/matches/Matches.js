import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton
} from "@material-ui/core";
import { Info } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export function Matches(props) {
  const classes = useStyles();
  const { leagueById, eventById } = props;
  function awayHome(n) {
    const { match } = n;
    return match.home + " Vs. " + match.away;
  }
  console.log(
    _.map(
      _.filter(props.MatchAPI[leagueById].matches, {
        idEvent: Number(eventById)
      }),
      awayHome
    )
  );

  const infoById = id => event => {
    event.preventDefault();
    window.location.href = `/match/${id}`;
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Match Day</ListSubheader>
        </GridListTile>
        {_.filter(props.MatchAPI[leagueById].matches, {
          idEvent: Number(eventById)
        }).map(el => (
          <GridListTile key={el.match.img}>
            <img src={el.match.img} alt={el.match.img} />
            <GridListTileBar
              title={el.match.home}
              subtitle={el.match.away}
              actionIcon={
                <IconButton
                  aria-label={`info about ${el.match.home}`}
                  className={classes.icon}
                  onClick={infoById(el.match.idMatch)}
                >
                  <Info />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
