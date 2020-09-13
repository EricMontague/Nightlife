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
    SET_SORT_ORDER: "SET_SORT_ORDER"
  },
  planList: {
    GET_PLANS: "GET_PLANS",
    ADD_PLAN: "ADD_PLAN",
    SET_SELECTED_PLAN: "SET_SELECTED_PLAN",
    DELETE_PLAN: "DELETE_PLAN"
  },
  plan: {
    CREATE_PLAN: "CREATE_PLAN",
    GET_PLAN: "GET_PLAN",
    UPDATE_PLAN: "UPDATE_PLAN"
  }
});

export default actionTypes;
