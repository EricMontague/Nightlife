import {
  ADD_PLAN_TO_LIST,
  DELETE_PLAN_FROM_LIST,
  UPDATE_PLAN_IN_LIST
} from "../actions/types";

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

const updatePlan = (plans, updatedPlan) => {
  return plans.map(plan =>
    plan.planId !== updatedPlan.planId ? plan : updatedPlan
  );
};

const deletePlan = (plans, planId) => {
  return plans.filter(plan => {
    return plan.planId !== planId;
  });
};

const initialState = { plans: [] };

const planListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAN_TO_LIST:
      return {
        plans: addNewPlan(state.plans, action.payload)
      };

    case UPDATE_PLAN_IN_LIST:
      return {
        plans: updatePlan(state.plans, action.payload)
      };

    case DELETE_PLAN_FROM_LIST:
      return {
        plans: deletePlan(state.plans, action.payload)
      };
    default:
      return state;
  }
};

export default planListReducer;
