import { firestore } from "./firebaseApp";
import { getUserDocument } from "./users";

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

  userDocument.plans = userDocument.plans.map(plan => {
    if (plan.planId === updatedPlan.planId) {
      return updatedPlan;
    }
    return plan;
    // return plan.planId === updatedPlan.planId ? updatedPlan : plan;
  });

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
    throw new Error(error.message);
  }
};
