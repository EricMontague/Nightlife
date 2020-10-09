import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_IN_REQUEST
} from "../actions/types";

const initialState = { isLoggedIn: false, currentUser: null, loading: false };
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        isLoggedIn: true,
        currentUser: { ...action.payload },
        loading: false
      };
    case USER_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false
      };
    case USER_SIGN_OUT_SUCCESS:
      return {
        isLoggedIn: false,
        currentUser: null,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;
