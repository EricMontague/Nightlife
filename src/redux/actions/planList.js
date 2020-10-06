import actionTypes from "./types";
import { DELETE_PLAN, SHOW_ERROR_ALERT, SHOW_SUCCESS_ALERT } from "./types";
import { getPlans, deletePlan } from "../../firebase/plans";
import constants from "../../utils/constants";
import defaultPlacePhoto from "../../assets/default_place_image.png";

const fetchPlans = async userId => {
  try {
    return await getPlans(userId);
  } catch (error) {
    console.log(`An error occurred while retrieving plans: ${error.message}`);
  }
};

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
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const photoUrl = placeResults.photos
        ? placeResults.photos[0].getUrl(photoOptions)
        : defaultPlacePhoto;
      const newPlan = {
        ...plan,
        image: photoUrl
      };
      dispatch({ type: actionTypes.planList.ADD_PLAN, newPlan: newPlan });
    } else {
      console.log(`There was an error retrieving the place's photo: ${status}`);
    }
  };
  return handlePlaceResults;
};

export const fetchPlansAndPhotos = userId => async dispatch => {
  try {
    const plans = await fetchPlans(userId);
    fetchAllPlansPhotos(plans, dispatch);
  } catch (error) {
    throw new Error(error.message);
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
      type: DELETE_PLAN,
      payload: planId
    });
    dispatch({
      type: SHOW_SUCCESS_ALERT,
      payload: constants.PLAN_DELETED_MESSAGE
    });
  }
};
