import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SigninForm from "./SigninForm";
import { login } from "../../actions/auth";

class Signin extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <h1>LoginPage</h1>
        <Link to="/">Home</Link>
        <SigninForm submit={this.submit} />
      </div>
    );
  }
}

Signin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Signin);
