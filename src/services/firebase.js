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

// Authentication functions
export const signInWithGoogle = async () => {
  return auth.signInWithRedirect(provider);
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

// Functions for reading and writing Firestore documents
export const getUserDocument = async userId => {
  let userDocument;
  try {
    userDocument = await firestore.doc(`users/${userId}`).get();
  } catch (error) {
    throw new Error(error.message);
  }

  if (!userDocument) {
    throw new Error("User not found");
  }
  return {
    userId,
    ...userDocument.data()
  };
};

export const storeUserDocument = async user => {
  if (!user) {
    throw new Error("Please provide a user");
  }
  const usersReference = firestore.doc(`users/${user.id}`);
  const userDocument = await usersReference.get();

  // create user if they don't already exist
  if (!userDocument.exists) {
    try {
      await usersReference.set({ user });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const addPlan = async (userId, plan) => {
  let userDocument;
  // get user document
  try {
    userDocument = await getUserDocument(userId);
  } catch (error) {
    throw new Error(error.message);
  }

  if (!userDocument) {
    throw new Error("User not found");
  }

  // add new plan
  userDocument.plans.push(plan);

  // Update firestore
  try {
    await firestore.doc(`users/${userId}`).update(userDocument);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePlan = async (userId, newPlan) => {
  let userDocument;
  try {
    userDocument = await getUserDocument(userId);
  } catch (error) {
    throw new Error(error.message);
  }

  if (!userDocument) {
    throw new Error("User not found");
  }

  userDocument.plans = userDocument.plans.map(plan => {
    return plan.planId === newPlan.planId ? newPlan : plan;
  });

  try {
    await firestore.doc(`users/${userId}`).update(userDocument);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePlan = async (userId, planId) => {
  try {
    await firestore.doc(`users/${userId}`).delete();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPlans = async userId => {
  let userDocument;

  // get user document
  try {
    userDocument = await getUserDocument(userId);
  } catch (error) {
    throw new Error(error.message);
  }

  if (!userDocument) {
    throw new Error("User not found");
  }
  return userDocument.plans;
};
