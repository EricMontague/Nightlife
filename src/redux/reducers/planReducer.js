import actionTypes from "../actions/types";
import { v4 as uuidv4 } from "uuid";
import trimObjectFieldValues from "../../utils/commonHelpers";

const addPlan = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);

  return {
    planId: uuidv4(),
    ...trimmedPlan
  };
};

const updatePlan = (currentPlan, newPlan) => {
  const trimmedPlan = trimObjectFieldValues(newPlan);
  return {
    plan: currentPlan.planId,
    ...trimmedPlan
  };
};

const planReducer = (state, action) => {
  switch (action.type) {
    case action.type === actionTypes.plan.CREATE_PLAN:
      return {
        plan: addPlan(action.plan)
      };
    case action.type === actionTypes.plan.GET_PLAN:
      return {
        plan: action.plan
      };
    case action.type === actionTypes.plan.UPDATE_PLAN:
      return {
        plan: updatePlan(state.plan, action.updatedPlan)
      };
    default:
      return state;
  }
};

export default planReducer;
