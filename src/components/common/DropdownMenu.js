import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeMenu = this.closeMenu.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  closeMenu() {
    console.log("called");
    this.props.toggleDeviceState(true);
  }

  renderMenu() {
    console.log(this.props.isOpen);
    if (this.props.isOpen) {
      return (
        <div className="dropdown-overlay">
          <ul className="dropdown-menu bg-dark nav-menu menu-slim h-100vh">
            <div className="close" onClick={this.closeMenu}>
              &times;
            </div>
            <li>
              <UserInfo
                user={this.props.currentUser}
                avatarClasses="img-rounded avatar-small"
              />
            </li>
            <li>
              <Link to="/create">
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
                Create List
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return <>{this.renderMenu()}</>;
  }
}

DropdownMenu.propTypes = {};

export default DropdownMenu;
