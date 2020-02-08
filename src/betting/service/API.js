import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { SportAPI } from './../apis/SportAPI';
import { LeagueAPI } from './../apis/LeagueAPI';
import { MatchAPI } from './../apis/MatchAPI';
import { EventiAPI } from '../apis/EventAPI';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Sports } from './../view/sports/Sports';
import { Events } from './../view/events/Events';
import { Leagues } from '../view/leagues/Leagues';
import { Matches } from './../view/matches/Matches';
import { Auth } from './../view/token/Auth';

export function APIS() {
	const sports = <Sports SportAPI={SportAPI} />;

	const sportsById = (props) => (
		<span>
			APIS,
			{JSON.stringify(_.find(SportAPI.sports, { sport: { id: Number(props.match.params.sportById) } }))}
		</span>
	);

	const leagues = <Leagues LeagueAPI={LeagueAPI} />;

	const leaguesById = (props) => (
		<span>
			APIS,
			{JSON.stringify(_.find(LeagueAPI.leagues, { league: { id: Number(props.match.params.leagueById) } }))}
		</span>
	);

	const events = <Events EventiAPI={EventiAPI} />;

	const eventById = (props) => (
		<span>
			APIS,
			{JSON.stringify(_.find(EventiAPI.events, { event: { id: Number(props.match.params.eventById) } }))}
		</span>
	);

	const matches = <Matches MatchAPI={MatchAPI} />;

	const matchesById = (props) => (
		<span>
			APIS,
			{JSON.stringify(_.find(MatchAPI.matches, { match: { id: Number(props.match.params.matchById) } }))}
		</span>
	);

	const init = (
		<Auth
			token={
				localStorage.getItem('token') === null ? (
					{ auth: 'admin', pass: btoa('admin') }
				) : (
					localStorage.getItem('token')
				)
			}
		/>
	);

	const found = (
		<span>
			DOESN'T EXISTS{' '}
			{localStorage.getItem('token') == null ? (
				<Link to="/">Tornare Auth</Link>
			) : (
				<Link to="/sports">Tornare Sports</Link>
			)}
		</span>
	);

	return (
		<Router>
			{localStorage.getItem('token') ? (
				<Switch>
					<Route exact={true} path="/sports">
						{sports}
					</Route>
					<Route exact={true} path="/sports/:sportById">
						{sportsById}
					</Route>
					<Route exact={true} path="/leagues">
						{leagues}
					</Route>
					<Route exact={true} path="/leagues/:leagueById">
						{leaguesById}
					</Route>
					<Route exact={true} path="/events">
						{events}
					</Route>
					<Route exact={true} path="/events/:eventById">
						{eventById}
					</Route>
					<Route exact={true} path="/matches">
						{matches}
					</Route>
					<Route exact={true} path="/matches/:matchById">
						{matchesById}
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
