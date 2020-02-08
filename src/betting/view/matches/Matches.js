import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root     : {
		display         : 'flex',
		flexWrap        : 'wrap',
		justifyContent  : 'space-around',
		overflow        : 'hidden',
		backgroundColor : theme.palette.background.paper
	},
	gridList : {
		width  : 500,
		height : 450
	},
	icon     : {
		color : 'rgba(255, 255, 255, 0.54)'
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
	console.log(_.map(props.MatchAPI.matches, 'match'));

	const infoById = (id) => (event) => {
		event.preventDefault();
		window.location.href = `matches/${id}`;
	};

	return (
		<div className={classes.root}>
			<GridList cellHeight={180} className={classes.gridList}>
				<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
					<ListSubheader component="div">Match Day</ListSubheader>
				</GridListTile>
				{props.MatchAPI.matches.map((el) => (
					<GridListTile key={el.match.img}>
						<img src={el.match.img} alt={el.match.img} />
						<GridListTileBar
							title={el.match.home}
							subtitle={el.match.away}
							actionIcon={
								<IconButton
									aria-label={`info about ${el.match.home}`}
									className={classes.icon}
									onClick={infoById(el.match.id)}
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
