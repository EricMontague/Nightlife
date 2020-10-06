import { USER_SIGN_IN, USER_SIGN_OUT } from "../actions/types";

const initialState = { isLoggedIn: false, currentUser: null };
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        isLoggedIn: true,
        currentUser: { ...action.payload }
      };
    case USER_SIGN_OUT:
      return {
        isLoggedIn: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default userReducer;
