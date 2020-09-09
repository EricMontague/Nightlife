import actionTypes from "./types";
import {
  disablePointerEvents,
  enablePointerEvents
} from "../../utils/commonHelpers";
import Poller from "../../utils/polling";
import { auth, provider } from "../../firebase/firebaseApp";
import { storeUserDocument, getUserDocument } from "../../firebase/users";

// Get user from firestore
const fetchUser = async (userId, dispatch) => {
  const currentUser = await getUserDocument(userId);
  enablePointerEvents();
  dispatch({
    type: actionTypes.auth.SIGN_IN,
    currentUser: {
      ...currentUser,
      userId: currentUser.id
    }
  });
};

export const authStateListener = () => dispatch => {
  return auth.onAuthStateChanged(async userAuth => {
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
            ...userAuth,
            userId: userAuth.id
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
};

export const registerUser = user => async dispatch => {
  try {
    // Create user account through firebase
    const results = await auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    storeUserDocument({
      id: results.user.uid,
      email: user.email,
      password: user.password,
      displayName: user.firstName + " " + user.lastName,
      photoURL: "",
      plans: []
    });
    // this.props.history.push("/");
  } catch (error) {
    console.log(
      `An error occured while registering the user: ${error.message}`
    );
  }
};

export const signInWithEmailAndPassword = (email, password) => dispatch => {
  try {
    auth.signInWithEmailAndPassword(email, password);
    console.log("User login successful!");
    // this.props.history.push("/");
  } catch (error) {
    console.log(`Error on login: ${error.message}`);
  }
};

export const signOut = () => dispatch => {
  auth
    .signOut()
    .then(() => {
      console.log("Sign out successful!");
    })
    .catch(error => console.log(`Error on sign out: ${error}`));
};

export const signInWithGoogle = () => dispatch => {
  auth.signInWithGoogle(provider).then(() => {
    auth
      .getRedirectResult()
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
  });
};
