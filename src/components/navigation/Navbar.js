import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavLinks from "./NavLinks";
import MobileNavMenu from "./MobileNavMenu";
import useDeviceState from "../../hooks/useDeviceState";
import useMobileMenuState from "../../hooks/useMobileMenuState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = props => {
  const isDesktop = useDeviceState();
  const [isOpen, toggleMenu] = useMobileMenuState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/">
              <FontAwesomeIcon icon={["fas", "glass-cheers"]} />{" "}
              <span>Nightlife</span>
            </Link>{" "}
          </div>
          {isDesktop && (
            <ul className="main-menu">
              <NavLinks
                currentUser={props.currentUser}
                isLoggedIn={props.isLoggedIn}
                isDropdownOpen={isOpen}
              />
            </ul>
          )}
          {!isDesktop && (
            <FontAwesomeIcon
              icon={["fas", "bars"]}
              size="lg"
              className="menu-btn"
              onClick={() => {
                toggleMenu(true);
              }}
            />
          )}
        </div>
      </nav>
      <MobileNavMenu
        currentUser={props.currentUser}
        isLoggedIn={props.isLoggedIn}
        isOpen={isOpen}
        isDesktop={isDesktop}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default Navbar;
