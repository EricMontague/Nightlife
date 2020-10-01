import { auth, provider } from "./firebaseApp";
import { storeUserDocument } from "./users";

export const registerUser = async user => {
  // Create user account through firebase
  const results = await auth.createUserWithEmailAndPassword(
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
};

export const signInWithEmailAndPassword = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return auth.signOut();
};

export const signInWithGoogle = async () => {
  return auth.signInWithRedirect(provider);
};

export const getRedirectResult = async () => {
  return auth.getRedirectResult().then(result => {
    if (result.user) {
      storeUserDocument({
        id: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        plans: []
      });
    }
  });
};
