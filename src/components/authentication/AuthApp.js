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
      await signInWithGoogle();
      console.log("Sign in successful!");
      this.props.history.push("/");
    } catch (error) {
      console.log(`Sign in Error: ${error.message}`);
    }
  }

  async registerUser(user) {
    try {
      // Create user account through firebase
      const results = await createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      storeUserDocument({
        id: results.user.uid,
        email: user.email,
        password: user.password,
        displayName: user.firstName + " " + user.lastName
      });
      console.log(`New user registered: ${user.firstName} ${user.lastName}`);
      this.props.history.push("/");
    } catch (error) {
      console.log(
        `An error occured while registering the user: ${error.message}`
      );
    }
  }

  async loginUser(email, password) {
    try {
      signInWithEmailAndPassword(email, password);
      console.log("User login successful!");
      this.props.history.push("/");
    } catch (error) {
      console.log(`Error on login: ${error.message}`);
    }
  }

  renderContent() {
    const path = this.props.match.path;
    if (path === "/signin") {
      return (
        <>
          <SignInForm
            signInWithGoogleOAuth={() => this.signInWithGoogleOAuth()}
            signInWithEmailAndPassword={(email, password) =>
              this.loginUser(email, password)
            }
          />
        </>
      );
    } else if (path === "/signup") {
      return (
        <>
          <SignUpForm
            signInWithGoogleOAuth={() => this.signInWithGoogleOAuth()}
            createUserWithEmailAndPasswordHandler={user =>
              this.registerUser(user)
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
  }),
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      state: PropTypes.objectOf(PropTypes.string.isRequired)
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired
  })
};

export default AuthApp;
