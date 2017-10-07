import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Menu } from "semantic-ui-react";
import { logout } from "../../actions/authCreator";

class Header extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <Menu size="large">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        />

        {isAuthenticated ? (
          <Menu.Menu position="right">
            <Button primary onClick={() => logout}>
              Logout
            </Button>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary>Sign In</Button>
            </Menu.Item>
            <Menu.Item>
              <Button primary>Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

/* const mapDispatchToProps = dispath => ({
  logout: dispath(logout())
}); */

export default connect(null, { logout })(Header);
