import { trimObjectFieldValues } from "../../utils/commonHelpers";
import {
  CREATE_PLAN,
  UPDATE_PLAN,
  RESET_PLAN,
  SHOW_SUCCESS_ALERT,
  SHOW_ERROR_ALERT,
  UPDATE_PLAN_IN_LIST
} from "./types";
import { addPlan, updatePlan } from "../../firebase/plans";
import { v4 as uuidv4 } from "uuid";
import constants from "../../utils/constants";

export const addPlanDetails = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);
  return {
    type: CREATE_PLAN,
    payload: {
      planId: uuidv4(),
      ...trimmedPlan
    }
  };
};

export const updatePlanDetails = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);
  return {
    type: UPDATE_PLAN,
    payload: trimmedPlan
  };
};

export const resetPlanDetails = () => {
  return {
    type: RESET_PLAN
  };
};

const stripPlaces = placesList => {
  return placesList.map((place, index) => {
    return { placeId: place.placeId, sortKey: index };
  });
};

// Google doesn't allow storage of Places API data for more than 30 days,
// with the sole exception being the the placeId attribute.
// Based on their terms and conditions, the placeId can be stored indefinitely
// https://developers.google.com/places/web-service/policies
export const storePlanInFirestore = (
  userId,
  places,
  plan
) => async dispatch => {
  let successful = true;
  if (places.length === 0) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: constants.NO_PLACES_SELECTED_ERROR_MESSAGE
    });
    successful = false;
  } else {
    plan.places = stripPlaces(places);
    try {
      await addPlan(userId, plan);
    } catch (error) {
      dispatch({
        type: SHOW_ERROR_ALERT,
        payload: error.message
      });
      successful = false;
    }
    dispatch({
      type: SHOW_SUCCESS_ALERT,
      payload: constants.PLAN_CREATED_SUCCESS_MESSAGE
    });
  }
  return successful;
};

export const updatePlanInFirestore = (
  userId,
  places,
  plan
) => async dispatch => {
  let successful = true;
  if (places.length === 0) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: constants.NO_PLACES_SELECTED_ERROR_MESSAGE
    });
    successful = false;
  } else {
    const updatedPlan = { ...plan };
    const photoOptions = {
      maxHeight: constants.GOOGLE_IMAGE_HEIGHT,
      maxWidth: constants.GOOGLE_IMAGE_WIDTH
    };
    plan.places = stripPlaces(places);

    try {
      await updatePlan(userId, plan);
      updatedPlan.image = places[0].photos[0].getUrl(photoOptions);
      dispatch({
        type: UPDATE_PLAN_IN_LIST,
        payload: updatedPlan
      });
      dispatch({
        type: SHOW_SUCCESS_ALERT,
        payload: constants.PLAN_UPDATED_SUCCESS_MESSAGE
      });
    } catch (error) {
      dispatch({
        type: SHOW_ERROR_ALERT,
        payload: error.message
      });
      successful = false;
    }
    return successful;
  }
};
