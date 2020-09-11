import React, { useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import DocumentTitle from "../navigation/DocumentTitle";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerUser
} from "../../redux/actions/authentication";

const AuthApp = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const currentUser = useSelector(state => state.authReducer.currentUser);
  console.log(isLoggedIn, currentUser);

  const loginUser = useCallback(
    (email, password) => dispatch(signInWithEmailAndPassword(email, password)),
    [dispatch]
  );
  const createUserWithEmailAndPasswordHandler = useCallback(
    user => dispatch(registerUser(user)),
    [dispatch]
  );

  if (isLoggedIn) {
    return (
      <Redirect to={`/users/${currentUser.displayName.replace(" ", "")}`} />
    );
  }

  return (
    <div className="centered-page-layout text-center p-all-3">
      <div className="card card-medium">
        <div className="card-body">
          <Switch>
            <Route exact path="/">
              <DocumentTitle title="Home | Nightlife">
                <Home signInWithGoogle={signInWithGoogle} />
              </DocumentTitle>
            </Route>
            <Route exact path="/signin">
              <DocumentTitle title="Sign In | Nightlife">
                <SignInForm
                  signInWithGoogle={signInWithGoogle}
                  signInWithEmailAndPassword={loginUser}
                />
              </DocumentTitle>
            </Route>
            <Route exact path="/signup">
              <DocumentTitle title="Sign Up | Nightlife">
                <SignUpForm
                  signInWithGoogle={signInWithGoogle}
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
