import actionTypes from "../actions/types";

const googleMapsReducer = (state, action) => {
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
