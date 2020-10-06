import {
  CREATE_PLAN,
  UPDATE_PLAN,
  FETCH_PLAN,
  RESET_PLAN
} from "../actions/types";
import { formatDate } from "../../utils/dateTimeHelpers";

const initialState = {
  planId: "",
  title: "",
  description: "",
  date: formatDate(new Date()),
  time: new Date().toTimeString().slice(0, 5)
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAN:
    case UPDATE_PLAN:
    case FETCH_PLAN:
      return { ...action.payload };
    case RESET_PLAN:
      return { ...initialState };
    default:
      return state;
  }
};

export default planReducer;
