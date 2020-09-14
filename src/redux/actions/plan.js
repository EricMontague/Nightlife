import { trimObjectFieldValues } from "../../utils/commonHelpers";
import actionTypes from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const addPlanDetails = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);
  return {
    type: actionTypes.plan.CREATE_PLAN,
    plan: {
      planId: uuidv4(),
      ...trimmedPlan
    }
  };
};

export const updatePlanDetails = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);
  return {
    type: actionTypes.plan.UPDATE_PLAN,
    updatedPlan: trimmedPlan
  };
};
