import React from "react";
import CenteredPageLayout from "../common/CenteredPageLayout";
import Card from "../common/Card";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { signInWithGoogle } from "../../services/firebase";
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
            <SignInForm signInWithGoogle={signInWithGoogle} />
          </>
        );

      case "/signup":
        return (
          <>
            <SignUpForm signInWithGoogle={signInWithGoogle} />
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
      <CenteredPageLayout>
        <Card classes="card-medium">{this.renderContent()}</Card>
      </CenteredPageLayout>
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
