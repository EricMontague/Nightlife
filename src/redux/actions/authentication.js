import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_IN_FAIL,
  SHOW_ERROR_ALERT
} from "./types";
import {
  disablePointerEvents,
  enablePointerEvents
} from "../../utils/commonHelpers";
import Poller from "../../utils/polling";
import { auth, provider } from "../../firebase/firebaseApp";
import { getUserDocument, storeUserDocument } from "../../firebase/users";

const WAS_AUTHENTICATED = "WAS_AUTHENTICATED";

const makeAuthRequest = dispatch => {
  const signedInWithGoogle = sessionStorage.getItem(USER_SIGN_IN_REQUEST);
  const wasAuthenticated = localStorage.getItem(WAS_AUTHENTICATED);
  if (signedInWithGoogle === "1" || wasAuthenticated === "1") {
    dispatch({
      type: USER_SIGN_IN_REQUEST
    });
  }
};

const authRequestErrorHandler = (errorMessage, dispatch) => {
  dispatch({
    type: SHOW_ERROR_ALERT,
    payload: errorMessage
  });
  dispatch({
    type: USER_SIGN_IN_FAIL
  });
};

// Get user from firestore
const fetchUser = async (userId, dispatch) => {
  const currentUser = await getUserDocument(userId);
  enablePointerEvents();
  dispatch({
    type: USER_SIGN_IN_SUCCESS,
    payload: {
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      userId: currentUser.id
    }
  });
  localStorage.setItem(WAS_AUTHENTICATED, "1");
};

export const authStateListener = () => dispatch => {
  makeAuthRequest(dispatch);
  const listener = auth.onAuthStateChanged(userAuth => {
    // user logging out
    if (!userAuth) {
      dispatch({
        type: USER_SIGN_OUT_SUCCESS
      });
      localStorage.removeItem(WAS_AUTHENTICATED);
      sessionStorage.removeItem(USER_SIGN_IN_REQUEST);
    } else {
      if (userAuth.displayName) {
        disablePointerEvents();
        // user signs in with google
        dispatch({
          type: USER_SIGN_IN_SUCCESS,
          payload: {
            displayName: userAuth.displayName,
            email: userAuth.email,
            photoURL: userAuth.photoURL,
            userId: userAuth.uid
          }
        });
        enablePointerEvents();
        localStorage.setItem(WAS_AUTHENTICATED, "1");
      } else if (userAuth && !userAuth.displayName) {
        disablePointerEvents();
        // user signs in with email and password
        const poller = new Poller(1000, 5);
        poller.start(
          fetchUser,
          errorMessage => authRequestErrorHandler(errorMessage, dispatch),
          [userAuth.uid, dispatch]
        );
      }
    }
  });
  return listener;
};

export const registerUser = user => async dispatch => {
  // Create user account through firebase
  sessionStorage.setItem(USER_SIGN_IN_REQUEST, "1");
  makeAuthRequest(dispatch);
  let results;
  try {
    results = await auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    await storeUserDocument({
      id: results.user.uid,
      email: user.email,
      password: user.password,
      displayName: user.firstName + " " + user.lastName,
      photoURL: "",
      plans: []
    });
  } catch (error) {
    authRequestErrorHandler(error.message, dispatch);
  }
};

export const signInWithEmailAndPassword = (
  email,
  password
) => async dispatch => {
  sessionStorage.setItem(USER_SIGN_IN_REQUEST, "1");
  makeAuthRequest(dispatch);
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    authRequestErrorHandler(error.message, dispatch);
  }
};

export const signOut = () => async dispatch => {
  try {
    return await auth.signOut();
  } catch (error) {
    authRequestErrorHandler(error.message, dispatch);
  }
};

export const signInWithGoogle = () => async dispatch => {
  sessionStorage.setItem(USER_SIGN_IN_REQUEST, "1");
  try {
    await auth.signInWithRedirect(provider);
  } catch (error) {
    authRequestErrorHandler(error.message, dispatch);
  }
};

export const getRedirectResult = () => async dispatch => {
  makeAuthRequest(dispatch);

  let result;
  try {
    result = await auth.getRedirectResult();
  } catch (error) {
    authRequestErrorHandler(error.message, dispatch);
  } finally {
    sessionStorage.removeItem(USER_SIGN_IN_REQUEST);
  }

  if (result.user) {
    storeUserDocument({
      id: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      plans: []
    });
    return result;
  }
};
