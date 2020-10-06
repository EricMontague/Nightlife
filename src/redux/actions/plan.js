import { trimObjectFieldValues } from "../../utils/commonHelpers";
import { CREATE_PLAN, UPDATE_PLAN } from "./types";
import { v4 as uuidv4 } from "uuid";

export const addPlanDetails = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);
  return {
    type: CREATE_PLAN,
    payload: {
      planId: uuidv4(),
      ...trimmedPlan
    }
  };
};

export const updatePlanDetails = plan => {
  const trimmedPlan = trimObjectFieldValues(plan);
  return {
    type: UPDATE_PLAN,
    payload: trimmedPlan
  };
};
