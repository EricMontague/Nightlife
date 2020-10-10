import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavLinks from "./NavLinks";
import MobileNavMenu from "./MobileNavMenu";
import useDeviceState from "../../hooks/useDeviceState";
import useMobileMenuState from "../../hooks/useMobileMenuState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = props => {
  const device = useDeviceState();
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const currentUser = useSelector(state => state.userReducer.currentUser);
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
          {device.isDesktop && (
            <ul className="main-menu">
              <NavLinks
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                isDropdownOpen={isOpen}
              />
            </ul>
          )}
          {!device.isDesktop && (
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
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
        isDesktop={device.isDesktop}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default Navbar;
