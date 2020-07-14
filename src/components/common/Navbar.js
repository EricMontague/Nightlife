import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const currentUser = useCurrentUser();
  const renderLinks = () => {
    if (currentUser) {
      return (
        <>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <FontAwesomeIcon icon={["fas", "glass-cheers"]} />{" "}
            <span>Nightlife</span>
          </Link>
        </div>
        <ul>{renderLinks()}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
