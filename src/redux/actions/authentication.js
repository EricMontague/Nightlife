import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_OUT_SUCCESS,
  SHOW_ERROR_ALERT
} from "./types";
import {
  disablePointerEvents,
  enablePointerEvents
} from "../../utils/commonHelpers";
import Poller from "../../utils/polling";
import { auth, provider } from "../../firebase/firebaseApp";
import { getUserDocument, storeUserDocument } from "../../firebase/users";

const SIGNED_IN_WITH_GOOGLE = "SIGNED_IN_WITH_GOOGLE";

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
};

export const authStateListener = () => dispatch => {
  const listener = auth.onAuthStateChanged(userAuth => {
    // user logging out
    if (!userAuth) {
      dispatch({
        type: USER_SIGN_OUT_SUCCESS
      });
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
    await auth.signInWithEmailAndPassword(email, password);
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
  sessionStorage.setItem(SIGNED_IN_WITH_GOOGLE, "1");
  try {
    await auth.signInWithRedirect(provider);
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const getRedirectResult = () => async dispatch => {
  const signedInWithGoogle = sessionStorage.getItem(SIGNED_IN_WITH_GOOGLE);
  if (signedInWithGoogle === "1") {
    dispatch({
      type: USER_SIGN_IN_REQUEST
    });
  }

  let result;
  try {
    result = await auth.getRedirectResult();
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  } finally {
    sessionStorage.removeItem(SIGNED_IN_WITH_GOOGLE);
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
