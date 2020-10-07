import {
  GET_PLACE_LIST,
  RESET_PLACE_LIST,
  ADD_PLACE_TO_LIST,
  DELETE_PLACE_FROM_LIST
} from "../actions/types";
import constants from "../../utils/constants";

const deletePlace = (places, placeId) => {
  const newPlaces = [];
  let found = false;
  for (let index = 0; index < places.length; index++) {
    if (places[index].placeId === placeId) {
      found = true;
      continue;
    }
    if (found) {
      places[index].sortKey -= 1;
    }
    newPlaces.push(places[index]);
  }
  return newPlaces;
};

const addPlace = (places, newPlace) => {
  const existingPlace = places.find(place => {
    return place.placeId === newPlace.placeId;
  });

  if (!existingPlace) {
    return [...places, newPlace];
  }
  return places;
};

const initialState = {
  places: [],
  sortOrder: constants.SORT_BY_KEY,
  selectedPlace: null
};

const placeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE_TO_LIST:
      return {
        places: addPlace(state.places, action.payload),
        sortOrder: state.sortOrder
      };

    case GET_PLACE_LIST:
      return {
        ...state,
        places: [...action.payload]
      };

    case DELETE_PLACE_FROM_LIST:
      return {
        places: deletePlace(state.places, action.payload),
        sortOrder: state.sortOrder
      };
    case RESET_PLACE_LIST:
      return {
        ...state,
        places: []
      };

    default:
      return state;
  }
};

export default placeListReducer;
