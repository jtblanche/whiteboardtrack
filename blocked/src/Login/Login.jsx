import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./Login.styles.js";

class SignIn extends Component {
	state = {
		errorMessage: "",
		email: "",
		password: ""
	};
	classes = this.props.classes;

	onSubmit = event => {
		event.preventDefault();
		axios
			.post("/api/login", {
				email: this.state.email,
				password: this.state.password
			})
			.then(function({ data }) {
				window.location.replace(data);
				// If there's an error, log the error
			})
			.catch(err => {
				let message = "Incorrect username or password.";
				switch (err.response.status) {
					case 500:
						message = "Server error, please try again later.";
						break;
					default:
						message = "Error, please try again later.";
						break;
				}
				this.setState({
					errorMessage: message
				});
			});
	};

	onChange = name => ({ target }) => this.setState({ [name]: target.value });

	render = () => (
		<main className={this.classes.main}>
			<CssBaseline />
			<Paper className={this.classes.paper}>
				<Typography
					component="h1"
					variant="h3"
					align="center"
					color="textPrimary"
					className={this.classes.heading}
					gutterBottom
				>
					Board Tracker
				</Typography>
				<Avatar className={this.classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
					align="center"
					color="textPrimary"
					gutterBottom
				>
					Sign in
				</Typography>
				<form className={this.classes.form} onSubmit={this.onSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input
							id="email"
							name="email"
							autoComplete="email"
							onChange={this.onChange("email")}
							autoFocus
							required={true}
							error={!!this.state.errorMessage}
						/>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							name="password"
							type="password"
							id="password"
							onChange={this.onChange("password")}
							autoComplete="current-password"
							required={true}
							error={!!this.state.errorMessage}
						/>
					</FormControl>
					{this.state.errorMessage && (
						<Typography color="error">*{this.state.errorMessage}</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={this.classes.submit}
					>
						Sign in
					</Button>
				</form>
			</Paper>
		</main>
	);
}

SignIn.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
