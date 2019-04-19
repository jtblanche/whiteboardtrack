import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Agreement from "./Agreement";
import FourOhFour from "./404";

export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/agreement" component={Agreement} />
			<Route component={FourOhFour} />
		</Switch>
	</BrowserRouter>
);
