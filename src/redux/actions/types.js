const actionTypes = Object.freeze({
  auth: {
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT",
    DELETE_ACCOUNT: "DELETE_ACCOUNT"
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
    DELETE_PLAN: "DELETE_PLAN"
  },
  plan: {
    GET_PLAN: "GET_PLAN",
    SET_PLAN: "SET_PLAN"
  }
});

// Single Plan
export const CREATE_PLAN = "CREATE_PLAN";
export const FETCH_PLAN = "FETCH_PLAN";
export const UPDATE_PLAN = "UPDATE_PLAN";
export const RESET_PLAN = "RESET_PLAN";

// Plan list
export const DELETE_PLAN = "DELETE_PLAN";

// Users
export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT_FAIL";

// Alerts
export const SHOW_SUCCESS_ALERT = "SHOW_SUCCESS_ALERT";
export const SHOW_ERROR_ALERT = "SHOW_ERROR_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

export default actionTypes;
