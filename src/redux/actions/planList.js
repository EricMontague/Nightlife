import {
  DELETE_PLAN_FROM_LIST,
  ADD_PLAN_TO_LIST,
  SHOW_ERROR_ALERT,
  SHOW_SUCCESS_ALERT
} from "./types";
import { getPlans, deletePlan } from "../../firebase/plans";
import constants from "../../utils/constants";
import defaultPlacePhoto from "../../assets/default_place_image.png";

const fetchAllPlansPhotos = (plans, dispatch) => {
  const placesService = new window.google.maps.places.PlacesService(
    document.createElement("div")
  );
  plans.forEach(plan => {
    if (plan.places.length > 0) {
      const placeRequest = {
        fields: ["photo"],
        placeId: plan.places[0].placeId
      };
      placesService.getDetails(placeRequest, storePlan(plan, dispatch));
    }
  });
};

const storePlan = (plan, dispatch) => {
  const photoOptions = {
    maxHeight: constants.GOOGLE_IMAGE_HEIGHT,
    maxWidth: constants.GOOGLE_IMAGE_WIDTH
  };
  const handlePlaceResults = (placeResults, status) => {
    let photoUrl;
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      photoUrl = placeResults.photos
        ? placeResults.photos[0].getUrl(photoOptions)
        : defaultPlacePhoto;
    } else {
      photoUrl = defaultPlacePhoto;
    }
    const newPlan = {
      ...plan,
      image: photoUrl
    };
    dispatch({ type: ADD_PLAN_TO_LIST, payload: newPlan });
  };
  return handlePlaceResults;
};

export const fetchPlansAndPhotos = userId => async dispatch => {
  try {
    const plans = await getPlans(userId);
    fetchAllPlansPhotos(plans, dispatch);
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const deleteUserPlan = (userId, planId) => async dispatch => {
  let deleted = false;
  try {
    await deletePlan(userId, planId); // firebase function
    deleted = true;
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
  if (deleted) {
    dispatch({
      type: DELETE_PLAN_FROM_LIST,
      payload: planId
    });
    dispatch({
      type: SHOW_SUCCESS_ALERT,
      payload: constants.PLAN_DELETED_SUCCESS_MESSAGE
    });
  }
};
