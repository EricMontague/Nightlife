import actionTypes from "../actions/types";
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
        sortKey: sortKey
      };

      dispatch({
        type: actionTypes.placeList.ADD_PLACE,
        newPlace
      });
    } else {
      console.log(`There was an error fetching place details data: ${status}`);
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
  console.log("fetchPlanAndPlaces");
  try {
    const plan = await getPlan(userId, planId);
    dispatch({
      type: actionTypes.plan.GET_PLAN,
      plan
    });
    fetchPlaces(plan, dispatch);
  } catch (error) {
    throw new Error(
      `An error occurred when setting the initial State: ${error.message}`
    );
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
    type: actionTypes.placeList.ADD_PLACE,
    newPlace
  });
};

export const deletePlace = placeId => {
  return {
    type: actionTypes.placeList.DELETE_PLACE,
    placeId
  };
};

export const setSelectedPlace = selectedPlace => {
  return {
    type: actionTypes.placeList.SET_SELECTED_PLACE,
    selectedPlace
  };
};

export const setSortOrder = sortOrder => {
  return {
    type: actionTypes.placeList.SET_SORT_ORDER,
    sortOrder
  };
};

export const setPlaceList = places => {
  return {
    type: actionTypes.placeList.SET_PLACE_LIST,
    places
  };
};
