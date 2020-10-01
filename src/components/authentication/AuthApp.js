import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import DocumentTitle from "../navigation/DocumentTitle";
import { useAlertContext } from "../../providers/AlertProvider";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerUser,
  getRedirectResult
} from "../../firebase/authentication";

const AuthApp = props => {
  const { showAlert, setAlertState } = useAlertContext();

  useEffect(() => {
    async function fetchData() {
      try {
        await getRedirectResult();
      } catch (error) {
        setAlertState({
          message: error.message,
          alertClassName: "danger"
        });
      }
    }
    fetchData();
  }, []);

  // Show alert if a message is set
  showAlert();

  const loginUser = async auth => {
    try {
      await signInWithEmailAndPassword(auth.email, auth.password);
    } catch (error) {
      setAlertState({
        message: error.message,
        alertClassName: "danger"
      });
    }
  };

  const createUserWithEmailAndPasswordHandler = async user => {
    try {
      await registerUser(user);
    } catch (error) {
      setAlertState({
        message: error.message,
        alertClassName: "danger"
      });
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setAlertState({
        message: error.message,
        alertClassName: "danger"
      });
    }
  };

  if (props.isLoggedIn) {
    return (
      <Redirect
        to={`/users/${props.currentUser.displayName.replace(" ", "")}`}
      />
    );
  }

  return (
    <div className="centered-page-layout text-center p-all-3">
      <div className="card card-medium">
        <div className="card-body">
          <Switch>
            <Route exact path="/">
              <DocumentTitle title="Home | Nightlife">
                <Home signInWithGoogle={signInWithGoogleHandler} />
              </DocumentTitle>
            </Route>
            <Route exact path="/signin">
              <DocumentTitle title="Sign In | Nightlife">
                <SignInForm
                  signInWithGoogle={signInWithGoogleHandler}
                  signInWithEmailAndPassword={loginUser}
                />
              </DocumentTitle>
            </Route>
            <Route exact path="/signup">
              <DocumentTitle title="Sign Up | Nightlife">
                <SignUpForm
                  signInWithGoogle={signInWithGoogleHandler}
                  createUserWithEmailAndPasswordHandler={
                    createUserWithEmailAndPasswordHandler
                  }
                />
              </DocumentTitle>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

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
