import React from "react";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutUser } from "../../services/firebase";
import PropTypes from "prop-types";

const NavLinks = props => {
  if (props.currentUser) {
    return (
      <>
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
          <a
            href="/logout"
            onClick={event => {
              event.preventDefault();
              signOutUser()
                .then(() => {
                  console.log("Sign out successful!");
                })
                .catch(error => console.log(`Error on sign out: ${error}`));
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
