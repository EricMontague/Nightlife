import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize app
firebase.initializeApp(firebaseConfig);

// Instantiate core classes
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// Authentication functions for firebase
export const signInWithGoogle = () => {
  return auth.signInWithRedirect(provider);
};

export const getRedirectSignInResult = async () => {
  return auth.getRedirectResult();
};

export const signInWithEmailAndPassword = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOutUser = async () => {
  return auth.signOut();
};

export const createUserWithEmailAndPassword = async (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
