import React, { useRef } from "react";
import PropTypes from "prop-types";
import NavLinks from "./NavLinks";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { disableScrollY, enableScrollY } from "../../utils/helpers";

const DropdownMenu = props => {
  if (props.isOpen) {
    disableScrollY();
  } else {
    enableScrollY();
  }

  const menuRef = useRef();

  // Necessary for when a user clicks a link to another page
  const closeMenu = () => {
    menuRef.current.parentElement.classList.replace("show", "hide");
    menuRef.current.classList.remove("slide-in");
    props.toggleMenu(false);
  };

  useOnClickOutside(menuRef, closeMenu);

  return (
    <div className={"dropdown-overlay" + (props.isOpen ? " show" : " hide")}>
      <ul
        className={
          "dropdown-menu bg-dark h-100vh" + (props.isOpen ? " slide-in" : "")
        }
        ref={menuRef}
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
          handleClick={closeMenu}
          isDropdownOpen={props.isOpen}
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
