import actionTypes from "../actions/types";
import { DELETE_PLAN } from "../actions/types";

const addNewPlan = (currentPlans, newPlan) => {
  let duplicateFound = false;
  const newPlanList = currentPlans.filter(plan => {
    if (plan.planId === newPlan.planId) {
      duplicateFound = true;
      return newPlan;
    } else {
      return plan;
    }
  });

  if (!duplicateFound) {
    newPlanList.push(newPlan);
  }
  return newPlanList;
};

const deletePlan = (plans, planId) => {
  return plans.filter(plan => {
    return plan.planId !== planId;
  });
};

const initialState = { plans: [] };

const planListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.planList.ADD_PLAN:
      return {
        plans: addNewPlan(state.plans, action.newPlan)
      };

    case DELETE_PLAN:
      return {
        plans: deletePlan(state.plans, action.payload)
      };
    default:
      return state;
  }
};

export default planListReducer;
