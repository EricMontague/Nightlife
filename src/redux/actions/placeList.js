import {
  SHOW_ERROR_ALERT,
  ADD_PLACE_TO_LIST,
  FETCH_PLAN,
  GET_PLACE_LIST,
  RESET_PLACE_LIST,
  DELETE_PLACE_FROM_LIST
} from "../actions/types";
import { getPlan } from "../../firebase/plans";
import constants from "../../utils/constants";

const addPlaceToStore = (sortKey, dispatch) => {
  const handlePlaceResults = (placeResults, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const newPlace = {
        placeId: placeResults.place_id,
        name: placeResults.name,
        businessStatus: placeResults.business_status,
        formattedAddress: placeResults.formatted_address,
        location: placeResults.geometry.location,
        openingHours: placeResults.opening_hours,
        photos: placeResults.photos || [],
        priceLevel: placeResults.price_level || constants.DEFAULT_PRICE_LEVEL,
        rating: placeResults.rating || constants.DEFAULT_RATING,
        website: placeResults.website || "",
        sortKey
      };

      dispatch({
        type: ADD_PLACE_TO_LIST,
        payload: newPlace
      });
    } else {
      dispatch({
        type: SHOW_ERROR_ALERT,
        payload: `There was an error fetching place details data: ${status}`
      });
    }
  };
  return handlePlaceResults;
};

const fetchPlaces = (plan, dispatch) => {
  const placesService = new window.google.maps.places.PlacesService(
    document.createElement("div")
  );
  plan.places.forEach(place => {
    const placeRequest = {
      fields: constants.PLACES_API_FIELDS,
      placeId: place.placeId
    };
    placesService.getDetails(
      placeRequest,
      addPlaceToStore(place.sortKey, dispatch)
    );
  });
};

export const fetchPlanAndPlaces = (userId, planId) => async dispatch => {
  try {
    const plan = await getPlan(userId, planId);
    dispatch({
      type: FETCH_PLAN,
      payload: plan
    });
    dispatch(resetPlaceList());
    fetchPlaces(plan, dispatch);
  } catch (error) {
    dispatch({
      type: SHOW_ERROR_ALERT,
      payload: error.message
    });
  }
};

export const addPlace = (placeResults, input, sortKey) => dispatch => {
  // Clear input
  input.value = "";
  const newPlace = {
    placeId: placeResults.place_id,
    name: placeResults.name,
    businessStatus: placeResults.business_status,
    formattedAddress: placeResults.formatted_address,
    location: placeResults.geometry.location,
    openingHours: placeResults.opening_hours,
    photos: placeResults.photos || [],
    priceLevel: placeResults.price_level || constants.DEFAULT_PRICE_LEVEL,
    rating: placeResults.rating || constants.DEFAULT_RATING,
    website: placeResults.website || "",
    sortKey
  };
  dispatch({
    type: ADD_PLACE_TO_LIST,
    payload: newPlace
  });
};

export const deletePlace = placeId => {
  return {
    type: DELETE_PLACE_FROM_LIST,
    payload: placeId
  };
};

export const getPlaceList = places => {
  return {
    type: GET_PLACE_LIST,
    payload: places
  };
};

export const resetPlaceList = () => {
  return {
    type: RESET_PLACE_LIST
  };
};
