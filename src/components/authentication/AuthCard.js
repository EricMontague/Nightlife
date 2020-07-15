import React from "react";
import PropTypes from "prop-types";

const AuthCard = props => {
  return (
    <div className="auth-card">
      <div className="auth-card-body">{props.children}</div>
    </div>
  );
};

AuthCard.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthCard;
