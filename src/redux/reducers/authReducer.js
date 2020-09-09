import actionTypes from "../actions/types";

const initialState = { isLoggedIn: false, currentUser: null };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.auth.SIGN_IN:
      console.log("Signing in!");
      console.log(state.currentUser === action.currentUser);
      return {
        isLoggedIn: true,
        currentUser: action.currentUser
      };

    case actionTypes.auth.SIGN_OUT:
      return {
        isLoggedIn: false,
        currentUser: null
      };

    case actionTypes.auth.DELETE_ACCOUNT:
      return {
        isLoggedIn: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default authReducer;
