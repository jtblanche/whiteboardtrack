import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link"
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { ProblemFull } from "../../Components";
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
        problem: null
    };

    componentDidMount = () => {
        if (this.props && this.props.match && this.props.match.params && this.props.match.params.problemId)
		axios.get(`/api/problem/${this.props.match.params.problemId}`).then(({ data }) => {
            console.log(data);
			this.setState({ problem: data, loading: false });
        });
	};

	render = () => {
		const classes = this.props.classes;
		return (
			<React.Fragment>
				<main>
					<div className={classNames(classes.layout, classes.cardGrid)}>
						<Grid container spacing={40}>
							{!this.state.loading && this.state.problem &&
								<Grid item sm={12} md={12} lg={12}>
									<ProblemFull {...this.state.problem} />
								</Grid>
                            }
                            {!this.state.loading && !this.state.problem &&
								<Grid item sm={12} md={12} lg={12}>
                                <Typography  align="center" component="div">
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
