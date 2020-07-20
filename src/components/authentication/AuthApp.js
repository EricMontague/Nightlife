import React from "react";
import CenteredPageLayout from "../common/CenteredPageLayout";
import Card from "../common/Card";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  storeUserDocument
} from "../../services/firebase";
import { UserContext } from "../../context/UserProvider";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class AuthApp extends React.Component {
  constructor(props) {
    super(props);
    this.renderContet = this.renderContent.bind(this);
    this.signInWithGoogleOAuth = this.signInWithGoogleOAuth.bind(this);
  }

  static contextType = UserContext;

  async signInWithGoogleOAuth() {
    try {
      const result = await signInWithGoogle();
      console.log("Sign in successful!");
    } catch (error) {
      console.log(`Sign in Error: ${error}`);
    }
  }

  async registerUser(user) {
    try {
      const { newUser } = await createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      storeUserDocument({
        email: user.email,
        password: user.password,
        displayName: user.firstName + " " + user.lastName
      });
      console.log(`New User registered: ${newUsers}`);
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(email, password) {
    try {
      const result = await signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  renderContent() {
    const path = this.props.match.path;
    if (path === "/signin") {
      return (
        <>
          <SignInForm
            signInWithGoogleOAuth={() => this.signInWithGoogleOAuth()}
          />
        </>
      );
    } else if (path === "/signup") {
      return (
        <>
          <SignUpForm
            signInWithGoogleOAuth={() => this.signInWithGoogleOAuth()}
            createUserWithEmailAndPasswordHandler={(email, password) =>
              this.registerUser(email, password)
            }
          />
        </>
      );
    }
  }

  render() {
    if (this.context.isLoggedIn) {
      return (
        <Redirect
          to={`/users/${this.context.currentUser.displayName.replace(" ", "")}`}
        />
      );
    } else {
      return (
        <CenteredPageLayout>
          <Card classes="card-medium">{this.renderContent()}</Card>
        </CenteredPageLayout>
      );
    }
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
