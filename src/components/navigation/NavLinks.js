import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import UserInfo from "../users/UserInfo";
import { signOut } from "../../redux/actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLinks = props => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    if (props.isDropdownOpen) {
      props.handleClick();
    }
  };

  const handleSignOutClick = async event => {
    event.preventDefault();
    handleLinkClick();
    dispatch(signOut());
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
          <a href="/logout" onClick={event => handleSignOutClick(event)}>
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
