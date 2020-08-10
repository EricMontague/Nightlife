import React from "react";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getRedirectSignInResult,
  storeUserDocument
} from "../../services/firebase";
import { AuthContext } from "../../context/AuthProvider";
import { Redirect, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

class AuthApp extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    getRedirectSignInResult()
      .then(result => {
        if (result.user) {
          storeUserDocument({
            id: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            plans: []
          })
            .then(() => {
              console.log("Successfully stored user document!");
            })
            .catch(error => {
              console.log(`Erro when storing document: ${error.message}`);
            });
        }
      })
      .catch(error => {
        console.log(`Error with getting redirect result: ${error.message}`);
      });
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
        displayName: user.firstName + " " + user.lastName,
        plans: []
      });
      console.log(`New user registered: ${user.firstName} ${user.lastName}`);
      // this.props.history.push("/");
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
      // this.props.history.push("/");
    } catch (error) {
      console.log(`Error on login: ${error.message}`);
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
        <div className="centered-page-layout text-center p-all-3">
          <div className="card card-medium">
            <div className="card-body">
              <Switch>
                <Route exact path="/">
                  <Home signInWithGoogle={signInWithGoogle} />
                </Route>
                <Route exact path="/signin">
                  <SignInForm
                    signInWithGoogle={signInWithGoogle}
                    signInWithEmailAndPassword={(email, password) =>
                      this.loginUser(email, password)
                    }
                  />
                </Route>
                <Route exact path="/signup">
                  <SignUpForm
                    signInWithGoogle={signInWithGoogle}
                    createUserWithEmailAndPasswordHandler={user =>
                      this.registerUser(user)
                    }
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
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
