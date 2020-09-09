import { combineReducers } from "redux";
import placeListReducer from "./placeListReducer";
import planListReducer from "./planListReducer";
import planReducer from "./planReducer";
import authReducer from "./authReducer";
import googleMapsReducer from "./googleMapsReducer";

const reducer = combineReducers({
  placeListReducer,
  planListReducer,
  planReducer,
  authReducer,
  googleMapsReducer
});

export default reducer;
