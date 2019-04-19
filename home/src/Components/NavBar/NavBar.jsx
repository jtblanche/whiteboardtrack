import React, { Component } from "react";
import styles from "./NavBar.styles.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PageView from "@material-ui/icons/Pageview";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import UserContext from "../../Contexts/User.js";
class NavBar extends Component {
    static contextType = UserContext;
    render = () => {
        const { classes } = this.props;
        const user = this.context;
        let avatarUrl = null;
        if (user && user.avatarUrl) {
            avatarUrl = user.avatarUrl;
        }
        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <a className={classes.link} href={process.env.PUBLIC_URL + '/'}>
                    <PageView className={classes.icon} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Board Tracker
                    </Typography>
                    </a>
                    <Avatar alt="TODO: fill in" src={avatarUrl} />
                    <a className={classes.logout} href="/logout">
                        <Button color="inherit">Logout</Button>
                    </a>
                </Toolbar>
            </AppBar>
        );
    }
};

NavBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
