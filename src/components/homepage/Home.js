import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithGoogle } from "../../services/firebase";

const Home = () => {
  return (
    <div className="home">
      <FontAwesomeIcon icon={["fas", "glass-cheers"]} className="logo" />
      <h1>Welcome to Nightlife</h1>
      <p className="lead">Plan your night out</p>
      <Link to="/signup" className="btn btn-primary btn-block">
        Continue with email
      </Link>
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        className="btn btn-secondary btn-block"
      >
        Continue with Google
      </button>

      <p>
        Already a member?
        <Link to="/login">
          {" "}
          <strong>Log In</strong>
        </Link>
      </p>
    </div>
  );
};

export default Home;
