import { firestore } from "./firebaseApp";

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

export const deleteUser = async userId => {
  try {
    await firestore.doc(`users/${userId}`).delete();
  } catch (error) {
    throw new Error(error.message);
  }
};
