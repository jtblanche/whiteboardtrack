import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Card.styles.js";

const ProblemCard = props => {
	const { classes } = props;
	return (
		<Card className={classNames(classes.card, props.className)}>
			<CardMedia
				className={classes.cardMedia}
				image={props.imageUrl}
				title={props.name + " image"}
			/>
			<CardContent className={classes.cardContent}>
				<Typography gutterBottom variant="h5" component="h2">
					{props.name}
				</Typography>
				<Typography>{props.short}</Typography>
			</CardContent>
			<CardActions>
                <a className={classes.link} href={`${process.env.PUBLIC_URL}/problem/${props.id}`}>
				<Button size="small" color="primary">
					View
				</Button>
                </a>
			</CardActions>
		</Card>
	);
};

ProblemCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProblemCard);
