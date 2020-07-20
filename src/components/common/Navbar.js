import React from "react";
import NavLinks from "./NavLinks";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import { useDeviceContext } from "../../context/DeviceProvider";
import useDropdownState from "../../hooks/useDropdownState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { currentUser } = useUserContext();
  const isDesktop = useDeviceContext();
  const [isVisible, toggleMenu] = useDropdownState(false);
  return (
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
            <NavLinks currentUser={currentUser} />
          </ul>
        )}

        <DropdownMenu
          currentUser={currentUser}
          isVisible={isVisible}
          isDesktop={isDesktop}
          toggleMenu={toggleMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
