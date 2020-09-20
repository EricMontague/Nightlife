import actionTypes from "../actions/types";
import { v4 as uuidv4 } from "uuid";
import { trimObjectFieldValues } from "../../utils/commonHelpers";
import { formatDate } from "../../utils/dateTimeHelpers";

const addPlan = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);

  return {
    planId: uuidv4(),
    ...trimmedPlan
  };
};

const setPlan = (currentPlan, newPlan) => {
  const trimmedPlan = trimObjectFieldValues(newPlan);
  return {
    ...trimmedPlan,
    planId: currentPlan.planId
  };
};

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
