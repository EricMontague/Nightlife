const actionTypes = Object.freeze({
  auth: {
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT",
    DELETE_ACCOUNT: "DELETE_ACCOUNT"
  },
  googleMaps: {
    SET_PLACE: "SET_PLACE",
    SET_ACTIVE_MARKER: "SET_ACTIVE_MARKER",
    SET_MAP_CENTER: "SET_MAP_CENTER"
  },
  placeList: {
    ADD_PLACE: "ADD_PLACE",
    DELETE_PLACE: "DELETE_PLACE",
    SET_PLACE_LIST: "SET_PLACE_LIST",
    SET_SELECTED_PLACE: "SET_SELECTED_PLACE",
    SET_SORT_ORDER: "SET_SORT_ORDER"
  },
  planList: {
    GET_PLANS: "GET_PLANS",
    ADD_PLAN: "ADD_PLAN",
    SET_SELECTED_PLAN: "SET_SELECTED_PLAN",
    DELETE_PLAN: "DELETE_PLAN"
  },
  plan: {
    GET_PLAN: "GET_PLAN",
    SET_PLAN: "SET_PLAN"
  }
});

export default actionTypes;
