import React from "react";
import PropTypes from "prop-types";

const AuthPage = props => {
  return <div className="auth-layout">props.children</div>;
};

AuthPage.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthPage;
