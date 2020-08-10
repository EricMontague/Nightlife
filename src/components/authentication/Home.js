import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Home = props => {
  return (
    <>
      <div className="card-header text-center">
        <FontAwesomeIcon
          icon={["fas", "glass-cheers"]}
          size="3x"
          className="logo-primary mb-1"
        />
        <h3 className="card-title">Welcome to Nightlife</h3>
        <p className="lead">Plan your night out</p>
      </div>

      <Link to="/signup" className="btn btn-primary btn-block mb-1 py-2">
        Continue with email
      </Link>
      <button
        type="button"
        onClick={props.signInWithGoogle}
        className="btn btn-secondary btn-block mb-1 py-2"
      >
        Continue with Google
      </button>
      <div className="card-footer flex justify-center">
        <p>
          Already a member? <Link to="/signin"> Sign In</Link>
        </p>
      </div>
    </>
  );
};

Home.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired
};

export default Home;
