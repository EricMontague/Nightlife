import actionTypes from "../actions/types";

const authReducer = (
  state = { isLoggedIn: false, currentUser: null },
  action
) => {
  switch (action.type) {
    case action.type === actionTypes.auth.SIGN_IN:
      return {
        isLoggedIn: true,
        currentUser: action.currentUser
      };

    case action.type === actionTypes.auth.SIGN_OUT:
      return {
        isLoggedIn: false,
        currentUser: null
      };

    case action.type === actionTypes.auth.DELETE_ACCOUNT:
      return {
        isLoggedIn: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default authReducer;
