import { combineReducers } from "redux";
import placeListReducer from "./placeListReducer";
import planListReducer from "./planListReducer";
import authReducer from "./authReducer";
import googleMapsReducer from "./googleMapsReducer";

const rootReducer = combineReducers({
  placeListReducer,
  planListReducer,
  authReducer,
  googleMapsReducer
});

export default rootReducer;
