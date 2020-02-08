import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { StarBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root     : {
		display         : 'flex',
		flexWrap        : 'wrap',
		justifyContent  : 'space-around',
		overflow        : 'hidden',
		backgroundColor : theme.palette.background.paper
	},
	gridList : {
		flexWrap  : 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform : 'translateZ(0)'
	},
	title    : {
		color : theme.palette.primary.light
	},
	titleBar : {
		background : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
	}
}));

export function Leagues(props) {
	const classes = useStyles();
	console.log(_.map(props.LeagueAPI.leagues, 'league.nome'));
	const infoById = (id) => (event) => {
		event.preventDefault();
		window.location.href = `leagues/${id}`;
	};
	return (
		<div className={classes.root}>
			<GridList className={classes.gridList} cols={2.5}>
				{props.LeagueAPI.leagues.map((el) => (
					<GridListTile key={el.league.img}>
						<img src={el.league.img} alt={el.league.nome} />
						<Link to="/events">
							<GridListTileBar
								title={el.league.nome}
								classes={{
									root  : classes.titleBar,
									title : classes.title
								}}
								actionIcon={
									<IconButton aria-label={`star ${el.league.nome}`} onClick={infoById(el.league.id)}>
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
