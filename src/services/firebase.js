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

// Functions for reading and writing Firestore documents
export const getUserDocument = async userId => {
  let userDocument;
  try {
    userDocument = await firestore.doc(`users/${userId}`).get();
  } catch (error) {
    throw new Error(error.message);
  }

  if (!userDocument.exists) {
    throw new Error("User not found");
  }
  return userDocument.data();
};

export const storeUserDocument = async user => {
  console.log("storeUserDocument called!");
  if (!user) {
    throw new Error("Please provide a user");
  }

  let userDocument;
  // See if user document exists already.
  // The getUserDocument functino will throw an error
  // If the user doesn't exist
  try {
    userDocument = await getUserDocument(user.id);
  } catch (error) {
    if (error.message === "User not found") {
      // pass
    } else {
      throw new Error(error.message);
    }
  }

  // Create new document
  if (!userDocument) {
    try {
      await firestore.doc(`users/${user.id}`).set({ ...user });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const getPlan = async (userId, planId) => {
  let userDocument;
  try {
    userDocument = await getUserDocument(userId);
  } catch (error) {
    throw new Error(error.message);
  }
  return userDocument.plans.find(plan => plan.planId === planId);
};

export const getPlans = async userId => {
  try {
    const userDocument = await getUserDocument(userId);
    return userDocument.plans;
  } catch (error) {
    throw new Error(error.message);
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

  // add new plan
  userDocument.plans.push(plan);

  // Update firestore
  try {
    await firestore.doc(`users/${userId}`).update(userDocument);
    console.log("Updated Document!");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePlan = async (userId, updatedPlan) => {
  let userDocument;
  try {
    userDocument = await getUserDocument(userId);
  } catch (error) {
    throw new Error(error.message);
  }

  console.log("Returned user plans: ");
  console.log(userDocument.plans);

  userDocument.plans = userDocument.plans.map(plan => {
    return plan.planId === updatedPlan.planId ? updatedPlan : plan;
  });

  console.log("Updated user plans: ");
  console.log(userDocument.plans);

  try {
    await firestore.doc(`users/${userId}`).update(userDocument);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePlan = async (userId, planId) => {
  let userDocument;

  try {
    userDocument = await getUserDocument(userId);
  } catch (error) {
    throw new Error(error.message);
  }

  userDocument.plans = userDocument.plans.filter(plan => {
    return plan.planId !== planId;
  });

  try {
    await firestore.doc(`users/${userId}`).update(userDocument);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const deleteUser = async userId => {
  try {
    await firestore.doc(`users/${userId}`).delete();
  } catch (error) {
    throw new Error(error.message);
  }
};
