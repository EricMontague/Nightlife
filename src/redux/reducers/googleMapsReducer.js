import actionTypes from "../actions/types";
import constants from "../../utils/constants";

const initialState = {
  selectedPlace: null,
  activeMarker: null,
  center: {
    lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
    lng: constants.DEFAULT_GOOGLE_MAPS_LNG
  }
};

const googleMapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.googleMaps.SET_PLACE:
      return {
        ...state,
        selectedPlace: action.selectedPlace
      };
    case actionTypes.googleMaps.SET_ACTIVE_MARKER:
      return {
        ...state,
        activeMarker: action.activeMarker
      };
    case aactionTypes.googleMaps.SET_MAP_CENTER:
      return {
        ...state,
        center: action.center
      };
    default:
      return state;
  }
};

export default googleMapsReducer;
