import actionTypes from "../actions/types";
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
    case actionTypes.plan.SET_PLAN:
      return { ...action.plan };
    case actionTypes.plan.GET_PLAN:
      return { ...action.plan };
    default:
      return state;
  }
};

export default planReducer;
