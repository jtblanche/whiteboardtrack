import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from 'react-markdown';
import Prism from "prismjs";

const styles = theme => ({
	media: {
		height: 0,
        paddingTop: "28.125%", // 16:9
        backgroundImage: "url(//images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)"
    },
    grow: {
        flexGrow: 1
    },
	actions: {
		display: "flex"
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	}
});

class RecipeReviewCard extends React.Component {
	state = { imageExpanded: true, hintExpanded: false };

	handleExpandClick = (name) => () => {
		this.setState(state => ({ [name]: !state[name] }));
    };
    componentDidUpdate = () => {
        Prism.highlightAll();
    };

	render() {
        const { classes, name, author, avatarUrl, imageUrl, description, hint, short } = this.props;
		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
                        <Avatar alt="TODO: fill in" src={avatarUrl} className={classes.avatar}/>
					}
					action={
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.imageExpanded
                            })}
                            onClick={this.handleExpandClick('imageExpanded')}
                            aria-expanded={this.state.imageExpanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
					}
					title={name}
					subheader={"By " + author}
				/>
				<Collapse in={this.state.imageExpanded} timeout="auto" unmountOnExit>
				<CardMedia
					className={classes.media}
					image={imageUrl}
					title={name + " image"}
				/>
                <CardContent className={classes.cardContent}>
                    <Typography component="div">
                        {short}
                    </Typography>
                </CardContent>
				</Collapse>
                <Divider />
				<CardContent>
					<Typography component="div">
                        <ReactMarkdown source={description} />
					</Typography>
				</CardContent>
				<CardActions className={classes.actions} disableActionSpacing>
					<IconButton aria-label="Add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="Share">
						<ShareIcon />
					</IconButton>
                    <div className={classes.grow}></div>
                    <Typography>
                        Hints:
                    </Typography>
                    <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.hintExpanded
                            })}
                            onClick={this.handleExpandClick('hintExpanded')}
                            aria-expanded={this.state.hintExpanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
				</CardActions>
				<Collapse in={this.state.hintExpanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography component="div">
                            <ReactMarkdown source={hint} />
                        </Typography>
					</CardContent>
				</Collapse>
                <script src={process.env.PUBLIC_URL + '/prism.js'}></script>
			</Card>
		);
	}
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
