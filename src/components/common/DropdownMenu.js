import React from "react";
import NavLinks from "./NavLinks";
import PropTypes from "prop-types";

const DropdownMenu = props => {
  if (props.isOpen) {
    document.body.classList.add("no-scroll-y");
  } else {
    document.body.classList.remove("no-scroll-y");
  }
  return (
    <div className={"faded-overlay" + " " + (props.isOpen ? "show" : "hide")}>
      <ul
        className={
          "dropdown-menu bg-dark h-100vh" +
          " " +
          (props.isOpen ? "slide-in" : "")
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
        <NavLinks
          currentUser={props.currentUser}
          isLoggedIn={props.isLoggedIn}
        />
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired),
  isLoggedIn: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default DropdownMenu;
