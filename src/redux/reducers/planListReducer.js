import actionTypes from "../actions/types";

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
        plans: [...state.plans, action.newPlan]
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
