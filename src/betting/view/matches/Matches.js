import React from "react";
import _ from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import { Info } from "@material-ui/icons";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 350,
    height: 150
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  formControl: {
    margin: theme.spacing(2.5),
    minWidth: 200,
    position: "relative",
    left: "15%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2.5)
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

  const [state, setState] = React.useState({});

  const handleClick = (name, idMatch) => event => {
    console.log(state, name);
    setState({
      ...state,
      [name]: event.currentTarget,
      [`bool-${idMatch}`]: !Boolean(state[`bool-${idMatch}`])
    });
  };

  const handleClose = (name, idMatch) => event => {
    event.preventDefault();
    setState({
      ...state,
      [`bool-${idMatch}`]: !Boolean(state[`bool-${idMatch}`]),
      [name]: null
    });
  };

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value.toString()
    });
  };

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

  const templateBMaker = (match, bookmakers) =>
    bookmakers.map(bookmaker => {
      return (
        <StyledMenuItem
          key={bookmaker.nome}
          selected={
            state[`bookmaker${match.idMatch}`] &&
            bookmaker.nome.toUpperCase() ===
              state[`bookmaker${match.idMatch}`]["alt"].toUpperCase()
          }
        >
          <ListItemIcon>
            <img
              onClick={handleClick(`bookmaker${match.idMatch}`, match.idMatch)}
              name={bookmaker.nome}
              src={bookmaker.img}
              alt={bookmaker.nome}
              style={{ width: 145, height: 75 }}
            />
          </ListItemIcon>
        </StyledMenuItem>
      );
    });

  return (
    <div className={classes.root}>
      <GridList cellHeight={180}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Match Day</ListSubheader>
        </GridListTile>
        <>
          {_.filter(props.MatchAPI[leagueById].matches, {
            idEvent: Number(eventById)
          }).map(el => {
            const template = (
              <GridListTile className={classes.gridList}>
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
            );

            const templateBookmaker = ({ match }) => (
              <FormControl variant="outlined" className={classes.formControl}>
                {state[`bookmaker${match.idMatch}`] ? (
                  <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick(
                      `anchorEl${match.idMatch}`,
                      match.idMatch
                    )}
                  >
                    {state[`bookmaker${match.idMatch}`]["alt"]}
                  </Button>
                ) : (
                  <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick(
                      `anchorEl${match.idMatch}`,
                      match.idMatch
                    )}
                  >
                    Scegliere Bookmaker
                  </Button>
                )}
                <StyledMenu
                  id="customized-menu"
                  anchorEl={state[`anchorEl${match.idMatch}`]}
                  keepMounted
                  open={state[`bool-${match.idMatch}`]}
                  onClose={handleClose(
                    `anchorEl${match.idMatch}`,
                    match.idMatch
                  )}
                >
                  {templateBMaker(
                    match,
                    props.BookmakerAPI[Number(match.idMatch)].bookmakers
                  )}
                </StyledMenu>
                {state[`bookmaker${match.idMatch}`] && (
                  <FormControl
                    component="fieldset"
                    className={classes.selectEmpty}
                  >
                    <FormLabel component="legend">Previsione</FormLabel>
                    <RadioGroup
                      aria-label="position"
                      name="position"
                      value={state[`odd${match.idMatch}`] || ""}
                      onChange={handleChange(`odd${match.idMatch}`)}
                      row
                    >
                      {console.log(
                        state[`bookmaker${match.idMatch}`] &&
                          state[`bookmaker${match.idMatch}`]["alt"]
                      )}
                      {_.filter(
                        props.BookmakerAPI[Number(match.idMatch)].bookmakers,
                        {
                          nome: state[`bookmaker${match.idMatch}`]["alt"]
                        }
                      ).map(ply => {
                        const templateOdd1 = (
                          <FormControlLabel
                            value={`1_${ply["1X2"].odd1.toString()}`}
                            control={<Radio color="primary" />}
                            label={ply["1X2"].odd1}
                            labelPlacement="bottom"
                          />
                        );
                        const templateOddX = "oddX" in ply["1X2"] && (
                          <FormControlLabel
                            value={`X_${ply["1X2"].oddX.toString()}`}
                            control={<Radio color="primary" />}
                            label={ply["1X2"].oddX}
                            labelPlacement="bottom"
                          />
                        );
                        const templateOdd2 = (
                          <FormControlLabel
                            value={`2_${ply["1X2"].odd2.toString()}`}
                            control={<Radio color="primary" />}
                            label={ply["1X2"].odd2}
                            labelPlacement="bottom"
                          />
                        );
                        return (
                          <Box component="span" m={1} key={ply.id}>
                            {templateOdd1}
                            {templateOddX}
                            {templateOdd2}
                          </Box>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                )}
              </FormControl>
            );

            return (
              <Box component="span" m={1} key={el.match.idMatch}>
                {template}
                {templateBookmaker(el)}
              </Box>
            );
          })}
        </>
      </GridList>
    </div>
  );
}
