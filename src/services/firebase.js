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

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  return await auth.signInWithRedirect(provider);
};

export const signInWithEmailAndPassword = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const signOutUser = async () => {
  return await auth.signOut();
};

export const createUserWithEmailAndPassword = async (email, password) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const getUserDocument = async userId => {
  if (!userId) {
    return null;
  }

  try {
    const userDocument = await firestore.doc(`users/${userId}`).get();
    return {
      userId,
      ...userDocument.data()
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const storeUserDocument = async user => {
  if (!user) {
    throw new Error("Please provide a user");
  }
  const usersReference = firestore.doc(`users/${user.id}`);
  const userDocument = await usersReference.get();

  // create user if they don't already exist
  if (!userDocument.exists) {
    const { displayName, email, password } = user;
    try {
      await usersReference.set({
        displayName,
        email,
        password
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
