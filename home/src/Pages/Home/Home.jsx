import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ProblemCard } from "../../Components";
import axios from 'axios';  

const styles = theme => ({
	appBar: {
		position: "relative"
	},
	link: {
		textDecoration: "inherit",
		color: "inherit"
	},
	logout: {
		textDecoration: "inherit",
		color: "inherit",
		marginLeft: "10px"
	},
	icon: {
		marginRight: theme.spacing.unit * 2,
		width: "2em",
		height: "2em"
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: "0 auto",
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardMedia: {
		paddingTop: "56.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing.unit * 6
	},
    progress: {
      margin: theme.spacing.unit * 2,
    },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class Home extends Component {
	constructor(props) {
		super(props);
    }
    
    state = {
        loading: true,
        problems: []
    };

    componentDidMount = () => {
		axios.get("/api/problem").then(({ data }) => {
            console.log(data);
			this.setState({ problems: data, loading: false });
        });
	};

	render = () => {
		const classes = this.props.classes;
		return (
			<React.Fragment>
				<main>
					{/* Hero unit */}
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
								variant="h6"
								align="center"
								color="textSecondary"
								paragraph
							>
								Practice whiteboarding and share your work with classmates,
								instructors, and TAs. Create your own whiteboarding problems and
								share those as well! Instructors can track your progress and
								help point you in the right direction!
							</Typography>
							<div className={classes.heroButtons}>
								<Grid container spacing={16} justify="center">
									{/* <Grid item>
										<a
											className={classes.link}
											href={`${process.env.PUBLIC_URL}/random`}
										>
											<Button variant="contained" color="primary">
												Get a Random Problem
											</Button>
										</a>
									</Grid>
									<Grid item>
										<Link
											className={classes.link}
											to={`${process.env.PUBLIC_URL}/answered`}
										>
											<Button variant="outlined" color="primary">
												Review Answered and Created Problems
											</Button>
										</Link>
									</Grid> */}
									<Grid item>
										<Link
											className={classes.link}
											to={`${process.env.PUBLIC_URL}/create`}
										>
											<Button color="primary">Share a Problem</Button>
										</Link>
									</Grid>
								</Grid>
							</div>
						</div>
					</div>
					<div className={classNames(classes.layout, classes.cardGrid)}>
						<Grid container spacing={40}>
							{!this.state.loading && this.state.problems.map(problem => (
								<Grid item key={problem.id} sm={6} md={4} lg={3}>
									<ProblemCard {...problem} />
								</Grid>
                            ))}
                            {!this.state.loading && !this.state.problems.length &&
								<Grid item sm={12} md={12} lg={12}>
                                <Typography align="center" component="div">
									No Results Found
                                </Typography>
								</Grid>
                            }
                            {this.state.loading &&
                                <CircularProgress className={classes.progress} />
                            }
						</Grid>
					</div>
				</main>
				{/* Footer */}
				<footer className={classes.footer}>
					<Typography variant="h6" align="center" gutterBottom>
						Board Tracker
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						color="textSecondary"
						component="p"
					>
						Prototype by Taylor Blanche.
					</Typography>
				</footer>
				{/* End footer */}
			</React.Fragment>
		);
	};
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
