import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import UserInfo from "../users/UserInfo";
import { signOut } from "../../redux/actions/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLinks = props => {
  const location = useLocation();
  const handleLinkClick = () => {
    if (props.isDropdownOpen) {
      props.handleClick();
    }
  };

  if (props.isLoggedIn) {
    return (
      <>
        <li>
          <Link
            to={`/users/${props.currentUser.displayName.replace(" ", "")}`}
            onClick={handleLinkClick}
          >
            <UserInfo
              user={props.currentUser}
              avatarClasses="img-rounded avatar-sm"
            />
          </Link>
        </li>
        {location.pathname !== "/plans/create" && (
          <li>
            <Link to="/plans/create" onClick={handleLinkClick}>
              <FontAwesomeIcon icon={["fas", "plus-circle"]} />
              Create List
            </Link>
          </li>
        )}

        <li>
          <a
            href="/logout"
            onClick={event => {
              event.preventDefault();
              handleLinkClick();
              signOut();
            }}
          >
            Logout
          </a>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <Link to="/signin" onClick={handleLinkClick}>
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/signup" onClick={handleLinkClick}>
            Sign Up
          </Link>
        </li>
      </>
    );
  }
};

NavLinks.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired),
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  isDropdownOpen: PropTypes.bool.isRequired
};

export default NavLinks;
