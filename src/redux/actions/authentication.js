import { USER_SIGN_IN, USER_SIGN_OUT, SHOW_ERROR_ALERT } from "./types";
import {
  disablePointerEvents,
  enablePointerEvents
} from "../../utils/commonHelpers";
import Poller from "../../utils/polling";
import { auth, provider } from "../../firebase/firebaseApp";
import { getUserDocument, storeUserDocument } from "../../firebase/users";

// Get user from firestore
const fetchUser = async (userId, dispatch) => {
  const currentUser = await getUserDocument(userId);
  enablePointerEvents();
  dispatch({
    type: USER_SIGN_IN,
    payload: {
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      userId: currentUser.id
    }
  });
};

export const authStateListener = () => dispatch => {
  const listener = auth.onAuthStateChanged(userAuth => {
    // user logging out
    if (!userAuth) {
      dispatch({
        type: USER_SIGN_OUT
      });
    } else {
      if (userAuth.displayName) {
        disablePointerEvents();
        // user signs in with google
        dispatch({
          type: USER_SIGN_IN,
          payload: {
            displayName: userAuth.displayName,
            email: userAuth.email,
            photoURL: userAuth.photoURL,
            userId: userAuth.uid
          }
        });
        enablePointerEvents();
      } else if (userAuth && !userAuth.displayName) {
        disablePointerEvents();
        // user signs in with email and password
        const poller = new Poller(1000, 5);
        poller.start(fetchUser, [userAuth.uid, dispatch]);
      }
    }
  });
  return listener;
};

export const registerUser = user => async dispatch => {
  // Create user account through firebase

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
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const signInWithEmailAndPassword = (
  email,
  password
) => async dispatch => {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const signOut = () => async dispatch => {
  try {
    return await auth.signOut();
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const signInWithGoogle = () => async dispatch => {
  try {
    return await auth.signInWithRedirect(provider);
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const getRedirectResult = () => async dispatch => {
  let result;
  try {
    result = await auth.getRedirectResult();
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
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
