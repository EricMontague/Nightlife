import React from "react";
import AuthPage from "./AuthPage";
import AuthCard from "./AuthCard";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import PropTypes from "prop-types";

class AuthApp extends React.Component {
  constructor(props) {
    super(props);
    this.renderContet = this.renderContent.bind(this);
  }

  renderContent() {
    switch (this.props.match.path) {
      case "/signin":
        return (
          <>
            <SignInForm />
          </>
        );

      case "/signup":
        return (
          <>
            <SignUpForm />
          </>
        );

      default:
        return (
          <>
            <Home />
          </>
        );
    }
  }

  render() {
    return (
      <AuthPage>
        <AuthCard>{this.renderContent()}</AuthCard>
      </AuthPage>
    );
  }
}

AuthApp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
};

export default AuthApp;
