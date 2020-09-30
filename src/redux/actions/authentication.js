import actionTypes from "./types";
import {
  disablePointerEvents,
  enablePointerEvents
} from "../../utils/commonHelpers";
import Poller from "../../utils/polling";
import { auth } from "../../firebase/firebaseApp";
import { getUserDocument } from "../../firebase/users";

// Get user from firestore
const fetchUser = async (userId, dispatch) => {
  const currentUser = await getUserDocument(userId);
  enablePointerEvents();
  dispatch({
    type: actionTypes.auth.SIGN_IN,
    currentUser: {
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
        type: actionTypes.auth.SIGN_OUT,
        currentUser: null
      });
    } else {
      if (userAuth.displayName) {
        disablePointerEvents();
        // user signs in with google
        dispatch({
          type: actionTypes.auth.SIGN_IN,
          currentUser: {
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
