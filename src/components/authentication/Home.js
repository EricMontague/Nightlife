import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithGoogle } from "../../services/firebase";

const Home = () => {
  return (
    <>
      <header className="auth-card-header">
        <FontAwesomeIcon icon={["fas", "glass-cheers"]} className="logo" />
        <h3 className="auth-card-title">Welcome to Nightlife</h3>
        <p>Plan your night out</p>
      </header>

      <Link to="/signup" className="btn btn-primary btn-shadow btn-block">
        Continue with email
      </Link>
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        className="btn btn-secondary btn-shadow btn-block"
      >
        Continue with Google
      </button>
      <footer>
        Already a member?
        <Link to="/signin">
          {" "}
          <strong>Sign In</strong>
        </Link>
      </footer>
    </>
  );
};

export default Home;
