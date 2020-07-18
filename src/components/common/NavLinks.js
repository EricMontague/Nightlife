import React from "react";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const NavLinks = props => {
  if (props.currentUser) {
    return (
      <>
        <li>
          <Link to="/create">
            <FontAwesomeIcon icon={["fas", "plus-circle"]} />
            Create List
          </Link>
        </li>
        <UserInfo
          user={props.currentUser}
          userInfoClasses="ml-3"
          avatarClasses="img-rounded avatar-small"
        />
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </>
    );
  }
};

NavLinks.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default NavLinks;
