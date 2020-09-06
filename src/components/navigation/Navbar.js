import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import NavLinks from "./NavLinks";
import DropdownMenu from "./DropdownMenu";
import useDeviceState from "../../hooks/useDeviceState";
import useDropdownState from "../../hooks/useDropdownState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { isLoggedIn, currentUser } = useAuthContext();
  const isDesktop = useDeviceState();
  const [isOpen, toggleMenu] = useDropdownState(false);
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
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
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
      <DropdownMenu
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
        isDesktop={isDesktop}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default Navbar;