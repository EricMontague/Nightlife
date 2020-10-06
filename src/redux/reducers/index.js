import { combineReducers } from "redux";
import placeListReducer from "./placeListReducer";
import planListReducer from "./planListReducer";
import planReducer from "./planReducer";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  placeListReducer,
  planListReducer,
  planReducer,
  userReducer,
  alertReducer
});

export default rootReducer;
