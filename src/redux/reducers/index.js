import { combineReducers } from "redux";
import placeListReducer from "./placeListReducer";
import planListReducer from "./planListReducer";
import planReducer from "./planReducer";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import { USER_SIGN_OUT_SUCCESS } from "../actions/types";

const appReducer = combineReducers({
  placeListReducer,
  planListReducer,
  planReducer,
  userReducer,
  alertReducer
});

const rootReducer = (state, action) => {
  if (action.type === USER_SIGN_OUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
