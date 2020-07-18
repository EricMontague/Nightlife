import React from "react";
import NavLinks from "./NavLinks";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import useDropdownState from "../../hooks/useDropdownState";
import { useDeviceState } from "../../context/DeviceProvider";
import { useCurrentUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const currentUser = useCurrentUser();
  const isDesktop = useDeviceState();
  const [isOpen, toggleMenu] = useDropdownState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <FontAwesomeIcon icon={["fas", "glass-cheers"]} />{" "}
            <span>Nightlife</span>
          </Link>{" "}
        </div>
        <ul className="main-menu">
          <NavLinks currentUser={currentUser} />
        </ul>
        {!isDesktop && (
          <FontAwesomeIcon
            icon={["fas", "bars"]}
            size="lg"
            className="menu-icon"
            onClick={() => toggleMenu(true)}
          />
        )}

        <DropdownMenu
          currentUser={currentUser}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
