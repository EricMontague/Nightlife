import actionTypes from "../actions/types";
import constants from "../../utils/constants";

const googleMapsReducer = (
  state = {
    selectedPlace: null,
    activeMarker: null,
    center: {
      lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
      lng: constants.DEFAULT_GOOGLE_MAPS_LNG
    }
  },
  action
) => {
  switch (action.type) {
    case action.type === actionTypes.googleMaps.SET_PLACE:
      return {
        ...state,
        selectedPlace: action.selectedPlace
      };
    case action.type === actionTypes.googleMaps.SET_ACTIVE_MARKER:
      return {
        ...state,
        activeMarker: action.activeMarker
      };
    case action.type === actionTypes.googleMaps.SET_MAP_CENTER:
      return {
        ...state,
        center: action.center
      };
    default:
      return state;
  }
};

export default googleMapsReducer;
