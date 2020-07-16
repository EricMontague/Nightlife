import React from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const currentUser = useCurrentUser();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <FontAwesomeIcon icon={["fas", "glass-cheers"]} />{" "}
            <span>Nightlife</span>
          </Link>{" "}
        </div>
        <ul>
          <NavLinks {...currentUser} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
