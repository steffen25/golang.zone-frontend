import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Home, Signin } from "../../containers";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    <Route location={location} path="/" exact component={Home} />
    <Route location={location} path="/login" exact component={Signin} />
    {isAuthenticated && <div>you are loggedin.</div>}
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
