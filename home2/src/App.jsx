import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavBar } from "./Components";
import { Home, Create, Answered, View } from "./Pages";
import axios from "axios";
import UserContext from "./Contexts/User.js";
import './App.css';

class App extends Component {
	state = {
		user: null
	};

	componentDidMount = () => {
		axios.get("/api/user_data").then(({ data }) => {
			this.setState({ user: data });
        });
	};

	render = () => (
		<BrowserRouter>
            <UserContext.Provider value={this.state.user}>
                <CssBaseline />
                <NavBar />
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/create`}
                    component={Create}
                />
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/problem/:problemId`}
                    component={View}
                />
            </UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
