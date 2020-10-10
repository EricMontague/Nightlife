import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import DocumentTitle from "../navigation/DocumentTitle";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerUser,
  getRedirectResult
} from "../../redux/actions/authentication";
import Loader from "react-loader-spinner";

const AuthApp = props => {
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser, loading } = useSelector(
    state => state.userReducer
  );

  useEffect(() => {
    dispatch(getRedirectResult());
  }, []);

  const loginUser = auth => {
    dispatch(signInWithEmailAndPassword(auth.email, auth.password));
  };

  const createUserWithEmailAndPasswordHandler = user => {
    dispatch(registerUser(user));
  };

  const signInWithGoogleHandler = () => {
    dispatch(signInWithGoogle());
  };

  if (isLoggedIn) {
    return (
      <Redirect to={`/users/${currentUser.displayName.replace(" ", "")}`} />
    );
  }

  return (
    <div className="centered-page-layout text-center py-6 px-3">
      {loading ? (
        <Loader
          type="TailSpin"
          width={80}
          height={window.innerHeight / 2}
          visible={loading}
          timeout={0}
        />
      ) : (
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
      )}
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
