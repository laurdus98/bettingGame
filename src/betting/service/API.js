import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { SportAPI } from "./../apis/SportAPI";
import { LeagueAPI } from "./../apis/LeagueAPI";
import { MatchAPI } from "./../apis/MatchAPI";
import { EventiAPI } from "../apis/EventAPI";
import { BookmakerAPI } from "../apis/BookmakerAPI";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Sports } from "./../view/sports/Sports";
import { Events } from "./../view/events/Events";
import { Leagues } from "../view/leagues/Leagues";
import { Matches } from "./../view/matches/Matches";
import { Auth } from "./../view/token/Auth";
import { Home } from "./../view/home/Home";
import { Logout } from "./../view/token/Logout";

export function APIS() {
  const sports = <Sports SportAPI={SportAPI} />;
  const leagues = () => {
    const leagues = [];
    Object.values(LeagueAPI).map(obj => {
      return obj.leagues.map(league => {
        return leagues.push(league);
      });
    });
    return (
      <span>
        APIS,
        {JSON.stringify(_.map(leagues, "league.nome"))}
      </span>
    );
  };
  const events = () => {
    const events = [];
    Object.values(EventiAPI).map(obj => {
      return obj.events.map(event => {
        return events.push(event);
      });
    });
    return _.map(
      _.sortBy(events, ["event.start_time", "event.idEvent"]),
      "event"
    ).map(el => {
      return (
        <React.Fragment key={el.idEvent}>
          <div>
            APIS, <Link to={`event/${el.idEvent}`}>{el.start_time}</Link>
          </div>
        </React.Fragment>
      );
    });
  };

  const sportsById = props => (
    <span>
      APIS,
      {JSON.stringify(
        _.find(SportAPI.sports, {
          sport: { idSport: Number(props.match.params.sportById) }
        })
      )}
    </span>
  );

  const leaguesBySportId = props => (
    <Leagues LeagueAPI={LeagueAPI} sportById={props.match.params.sportById} />
  );

  const leaguesById = props => {
    const leagues = [];
    Object.values(LeagueAPI).map(obj => {
      return obj.leagues.map(league => {
        return leagues.push(league);
      });
    });

    return (
      <span>
        APIS,
        {JSON.stringify(
          _.find(leagues, {
            league: { idLeague: Number(props.match.params.leagueById) }
          })
        )}
      </span>
    );
  };

  const leagueIdBySportId = props => {
    return (
      <span>
        APIS,
        {JSON.stringify(
          _.find(LeagueAPI[props.match.params.sportById].leagues, {
            league: { idLeague: Number(props.match.params.leagueById) }
          })
        )}
      </span>
    );
  };

  const eventsByLeagueId = props => (
    <Events EventiAPI={EventiAPI} leagueById={props.match.params.leagueById} />
  );

  const eventsById = props => {
    const events = [];
    Object.values(EventiAPI).map(obj => {
      return obj.events.map(event => {
        return events.push(event);
      });
    });

    return (
      <span>
        APIS,
        {JSON.stringify(
          _.find(events, {
            event: { idEvent: Number(props.match.params.eventById) }
          })
        )}
      </span>
    );
  };

  const matchesByEventId = props => (
    <Matches
      MatchAPI={MatchAPI}
      BookmakerAPI={BookmakerAPI}
      leagueById={props.match.params.leagueById}
      eventById={props.match.params.eventById}
    />
  );

  const matchesById = props => {
    const matches = [];
    Object.values(MatchAPI).map(obj => {
      return obj.matches.map(match => {
        return matches.push(match);
      });
    });

    return (
      <span>
        APIS,
        {JSON.stringify(
          _.find(matches, {
            match: {
              idMatch: Number(props.match.params.matchById)
            }
          })
        )}
      </span>
    );
  };

  const init =
    localStorage.getItem("token") === null ? (
      <Auth token={{ auth: "admin", pass: btoa("admin") }} />
    ) : (
      <Home token={JSON.parse(localStorage.getItem("token"))["auth"]} />
    );

  const logout = <Logout />;

  const found = (
    <span>
      DOESN'T EXISTS{" "}
      {localStorage.getItem("token") == null ? (
        <Link to="/">Tornare Auth</Link>
      ) : (
        <Link to="/sports">Tornare Sports</Link>
      )}
    </span>
  );

  return (
    <Router>
      {localStorage.getItem("token") ? (
        <Switch>
          <Route exact={true} path="/">
            {init}
          </Route>
          <Route exact={true} path="/logout">
            {logout}
          </Route>
          <Route exact={true} path="/sports">
            {sports}
          </Route>
          <Route exact={true} path="/leagues">
            {leagues}
          </Route>
          <Route exact={true} path="/events">
            {events}
          </Route>
          <Route exact={true} path="/sport/:sportById">
            {sportsById}
          </Route>
          <Route exact={true} path="/league/:leagueById">
            {leaguesById}
          </Route>
          <Route exact={true} path="/event/:eventById">
            {eventsById}
          </Route>
          <Route exact={true} path="/match/:matchById">
            {matchesById}
          </Route>
          <Route exact={true} path="/sport/:sportById/leagues">
            {leaguesBySportId}
          </Route>
          <Route exact={true} path="/sport/:sportById/league/:leagueById">
            {leagueIdBySportId}
          </Route>
          <Route exact={true} path="/league/:leagueById/events">
            {eventsByLeagueId}
          </Route>
          <Route
            exact={true}
            path="/league/:leagueById/event/:eventById/matches"
          >
            {matchesByEventId}
          </Route>
          <Route>{found}</Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact={true} path="/">
            {init}
          </Route>
          <Route>{found}</Route>
        </Switch>
      )}
    </Router>
  );
}
