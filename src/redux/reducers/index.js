import { combineReducers } from "redux";
import placeListReducer from "./placeListReducer";
import planListReducer from "./planListReducer";
import planReducer from "./planReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  placeListReducer,
  planListReducer,
  planReducer,
  authReducer
});

export default rootReducer;
