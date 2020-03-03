import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Match Day</ListSubheader>
        </GridListTile>
        {_.filter(props.MatchAPI[leagueById].matches, {
          idEvent: Number(eventById)
        }).map(el => {
          const template = (
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
          );

          const templateBookmaker = (
            <FormControl
              key={el.match.img}
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                ref={inputLabel}
                htmlFor={`outlined-bookmaker${el.match.idMatch}-native-simple`}
              >
                Scegliere Bookmaker
              </InputLabel>
              <Select
                native
                value={state[`bookmaker${el.match.idMatch}`]}
                onChange={handleChange(`bookmaker${el.match.idMatch}`)}
                labelWidth={labelWidth}
                inputProps={{
                  name: `bookmaker${el.match.idMatch}`,
                  id: `outlined-bookmaker${el.match.idMatch}-native-simple`
                }}
              >
                <option value="" />
                {props.BookmakerAPI[Number(el.match.idMatch)].bookmakers.map(
                  el => {
                    return (
                      <option key={el.id} value={el.nome}>
                        {el.nome}
                      </option>
                    );
                  }
                )}
              </Select>
              {console.log(state)}
              {state[`bookmaker${el.match.idMatch}`] && (
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Previsione</FormLabel>
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={state[`odd${el.match.idMatch}`] || ""}
                    onChange={handleChange(`odd${el.match.idMatch}`)}
                    row
                  >
                    {_.filter(
                      props.BookmakerAPI[Number(props.eventById)].bookmakers,
                      {
                        nome: state[`bookmaker${el.match.idMatch}`]
                      }
                    ).map(el => {
                      return (
                        <React.Fragment key={el.id}>
                          <FormControlLabel
                            value={el["1X2"].odd1.toString()}
                            control={<Radio color="primary" />}
                            label={el["1X2"].odd1}
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value={el["1X2"].oddX.toString()}
                            control={<Radio color="primary" />}
                            label={el["1X2"].oddX}
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value={el["1X2"].odd2.toString()}
                            control={<Radio color="primary" />}
                            label={el["1X2"].odd2}
                            labelPlacement="bottom"
                          />
                        </React.Fragment>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            </FormControl>
          );
          return templateBookmaker;
        })}
      </GridList>
    </div>
  );
}
