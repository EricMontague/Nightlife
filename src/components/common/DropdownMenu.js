import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DropdownMenu = props => {
  if (props.isOpen) {
    return (
      <div className="dropdown-overlay">
        <ul className="dropdown-menu bg-dark slide-in h-100vh">
          <div
            className="close"
            onClick={event => {
              event.target.parentElement.classList.add("slide-out");
            }}
          >
            &times;
          </div>
          <li>
            <UserInfo
              user={props.currentUser}
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
};

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default DropdownMenu;
