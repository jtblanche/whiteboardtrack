import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./Agreement.styles.js";

class Agreement extends Component {
	state = {
		errorMessage: ""
	};

	onSubmit = event => {
		event.preventDefault();
		axios
			.put("/api/accept")
			.then(function({ data }) {
				window.location.replace(data);
				// If there's an error, log the error
			})
			.catch(err => {
				console.log(err);
				this.setState({
					// only conceivable error is server went down.
					errorMessage:
						"Server error occurred, please refresh and try again later."
				});
			});
	};

	render = () => {
		const classes = this.props.classes;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography
						component="h1"
						variant="h3"
						align="center"
						color="textPrimary"
						className={classes.heading}
						gutterBottom
					>
						Board Tracker
					</Typography>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component="h1"
						variant="h5"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						In using this website, when you post, you will make your github
						image and github username available to other users of this website.
					</Typography>
					{this.state.errorMessage && (
						<Typography color="error">*{this.state.errorMessage}</Typography>
					)}
					<form className={classes.form} onSubmit={this.onSubmit}>
						<div className={classes.link}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								color="primary"
							>
								Accept
							</Button>
						</div>
						<a className={classes.link} href="/logout">
							<Button fullWidth variant="contained" color="inherit">
								Leave
							</Button>
						</a>
					</form>
				</Paper>
			</main>
		);
	};
}

Agreement.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Agreement);
