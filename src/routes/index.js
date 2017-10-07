import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { userIsAuthenticated } from "../utilities/Auth";
import { Home, Signin, Dashboard, NotFound } from "../containers";

export const routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={Signin} />
    <Route path="/dashboard" exact component={userIsAuthenticated(Dashboard)} />
    <Route component={NotFound} />
  </Switch>
);

export const links = () => (
  <ul>
    <Link to="/">Home</Link>
    <Link to="/signin">Sign in</Link>
    <Link to="/signup">Sign up</Link>
  </ul>
);
