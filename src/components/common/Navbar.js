import React from "react";
import NavLinks from "./NavLinks";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import useDeviceState from "../../hooks/useDeviceState";
import { useCurrentUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const currentUser = useCurrentUser();
  const [isDesktop, toggleDeviceState] = useDeviceState(true);

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
        <FontAwesomeIcon
          icon={["fas", "bars"]}
          size="lg"
          className="menu-icon"
          onClick={() => toggleDeviceState(false)}
        />
        <DropdownMenu
          currentUser={currentUser}
          toggleDeviceState={toggleDeviceState}
          isOpen={!isDesktop}
        />
      </div>
    </nav>
  );
};

export default Navbar;
