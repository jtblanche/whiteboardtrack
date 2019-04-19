import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./Form.styles.js";

const ProblemForm = ({ classes, name, imageUrl, short, description, hint, onChange }) => (
	<React.Fragment>
		<Typography component="h1" variant="h4" align="center">
			Your Whiteboard Problem
		</Typography>
		<Grid item xs={12}>
			<TextField
                required
				label="Unique Name"
				value={name}
				onChange={onChange("name")}
				className={classes.textField}
				margin="normal"
			/>
			<TextField
                required
				label="Image Url"
				value={imageUrl}
				onChange={onChange("imageUrl")}
				className={classes.textField}
				margin="normal"
			/>
			<TextField
                required
				label="Short Description"
				multiline
				rowsMax="4"
				value={short}
				onChange={onChange("short")}
				className={classes.textField}
				margin="normal"
			/>
			<TextField
                required
				label="Full Instructions (Markdown Available)"
				multiline
				value={description}
				onChange={onChange("description")}
				className={classes.textField}
				margin="normal"
			/>
			<TextField
                required
				label="Hints (Markdown Available)"
				multiline
				value={hint}
				onChange={onChange("hint")}
				className={classes.textField}
				margin="normal"
			/>
		</Grid>
	</React.Fragment>
);

ProblemForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProblemForm);
