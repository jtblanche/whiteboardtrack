import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { ProblemForm, ProblemCard, ProblemFull } from "../../Components";
import UserContext from '../../Contexts/User.js';
import axios from 'axios';

const styles = theme => ({
	grow: {
		flexGrow: 1
	},
	cardLayout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3
	},
	cardGrid: {},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
		padding: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 3
		}
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	textField: {
		width: "100%"
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit
	}
});

class Create extends React.Component {
	state = {
		name: "",
		description: "",
		short: "",
        imageUrl: "",
        hint: ""
	};
    static contextType = UserContext;

    onChange = name => ({ target }) => this.setState({ [name]: target.value });
    handleSubmit = event => {
        event.preventDefault();
        console.log('test');
		axios
			.post("/api/problem", this.state)
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

	render() {
		const { classes } = this.props;
        const user = this.context;
        let avatarUrl = null;
        let author = "";
        if (user && user.avatarUrl) {
            avatarUrl = user.avatarUrl;
        }
        if (user && user.githubUserName) {
            author = user.githubUserName;
        }

		return (
			<React.Fragment>
				<main>
					<Grid container spacing={40}>
						<Grid item sm={12} md={6} lg={4}>
							<div
								className={classNames(
									classes.cardLayout,
									classes.cardGrid
								)}
							>
                                <form onSubmit={this.handleSubmit}>
								<Paper className={classes.paper}>
                                    <ProblemForm {...this.state} onChange={this.onChange} />
                                    <Button type="submit">Save</Button>
								</Paper>
                                </form>
							</div>
						</Grid>
						<Grid
							item
							className={classes.grow}
							item
							sm={12}
							md={6}
							lg={8}
						>
							<div
								className={classNames(
									classes.cardLayout,
									classes.cardGrid
								)}
							>
								<Typography variant="h6">
									Look and Feel:
								</Typography>

                                <Grid sm={8} md={6} lg={4}>
                                    <ProblemCard
                                        className={classes.selectedCard}
                                        name={this.state.name}
                                        short={this.state.short}
                                        imageUrl={this.state.imageUrl.replace(
                                            /^https?:/,
                                            ""
                                        )}
                                    />
                                </Grid>
                                <ProblemFull 
											name={this.state.name}
											short={this.state.short}
											imageUrl={this.state.imageUrl.replace(
												/^https?:/,
												""
                                            )}
                                            avatarUrl={avatarUrl}
                                            author={author}
                                            description={this.state.description}
                                            hint={this.state.hint}
                                            />
							</div>
						</Grid>
					</Grid>
				</main>
			</React.Fragment>
		);
	}
}

Create.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Create);
