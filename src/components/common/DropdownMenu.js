import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import PropTypes from "prop-types";

const DropdownMenu = props => {
  if (!props.isDesktop) {
    return (
      <>
        <FontAwesomeIcon
          icon={["fas", "bars"]}
          size="lg"
          className="menu-btn"
          onClick={event => {
            props.toggleMenu(true);
          }}
        />
        <div
          className={"dropdown-overlay" + " " + (props.isVisible ? "show" : "")}
        >
          <ul
            className={
              "dropdown-menu bg-dark h-100vh" +
              " " +
              (props.isVisible ? "slide-in" : "")
            }
          >
            <div
              className="close"
              onClick={event => {
                props.toggleMenu(false);
              }}
            >
              &times;
            </div>
            <NavLinks currentUser={props.currentUser} />

            {/* {props.currentUser && (
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
            )} */}
          </ul>
        </div>
      </>
    );
  } else {
    return null;
  }
};

DropdownMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired),
  toggleMenu: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default DropdownMenu;
