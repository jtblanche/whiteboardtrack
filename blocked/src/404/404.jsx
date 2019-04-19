import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./404.styles.js";

const Album = ({ classes }) => (
	<React.Fragment>
		<CssBaseline />
		<main className={classes.main}>
			{/* Hero unit */}
			<Paper className={classes.paper}>
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							Board Tracker
						</Typography>
						<Typography
							component="h1"
							variant="h5"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							404 - Not Found
						</Typography>
						<Typography
							variant="h6"
							align="center"
							color="textSecondary"
							paragraph
						>
							The page you were looking for was not found, sorry.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={16} justify="center">
								<Grid item>
									<a className={classes.link} href="/">
										<Button variant="contained" color="primary">
											Go Back Home
										</Button>
									</a>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</Paper>
		</main>
	</React.Fragment>
);

Album.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Album);
