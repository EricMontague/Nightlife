import actionTypes from "../actions/types";

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

const initialState = { selectedPlan: null, plans: [] };

const planListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.planList.ADD_PLAN:
      return {
        selectedPlan: state.selectedPlan,
        plans: addNewPlan(state.plans, action.newPlan)
      };

    case actionTypes.planList.SET_SELECTED_PLAN:
      return {
        selectedPlan: action.selectedPlan,
        plans: [...state.plans]
      };

    case actionTypes.planList.DELETE_PLAN:
      return {
        selectedPlan: state.selectedPlan,
        plans: deletePlan(state.plans, action.planId)
      };
    default:
      return state;
  }
};

export default planListReducer;
