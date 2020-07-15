import React from "react";
import AuthPage from "AuthPage";
import AuthCard from "AuthCard";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PropTypes from "prop-types";

class AuthApp extends React.Component {
  constructors(props) {
    super(props);
    this.renderPage = this.renderPage.bind(this);
  }

  renderContent() {
    switch (this.props.match.path) {
      case "/":
        return (
          <>
            <Home />
          </>
        );
      case "/login":
        return (
          <>
            <LoginForm />
          </>
        );

      case "/signup":
        return (
          <>
            <SignUpForm />
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
