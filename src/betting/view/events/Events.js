import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root  : {
		minWidth : 275
	},
	title : {
		fontSize : 14
	},
	pos   : {
		marginBottom : 12
	}
});

export function Events(props) {
	const classes = useStyles();
	console.log(_.map(props.EventiAPI.events, 'event'));

	function linkToMatches() {
		window.location.href = '/matches';
	}

	const infoById = (id) => (event) => {
		event.preventDefault();
		window.location.href = `events/${id}`;
	};

	return props.EventiAPI.events.map((el) => (
		<Card key={el.event.id} className={classes.root} variant="outlined">
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Event of the Day
				</Typography>
				<Typography variant="h5" component="h2" onClick={infoById(el.event.id)}>
					{el.event.start_time.split('.').join('-')}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					Matches Days
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={linkToMatches}>
					Vedi altro....
				</Button>
			</CardActions>
		</Card>
	));
}
