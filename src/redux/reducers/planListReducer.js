import actionTypes from "../actions/types";

const deletePlan = (plans, planId) => {
  return plans.filter(plan => {
    return plan.planId !== planId;
  });
};

const initialState = { selectedPlan: null, plans: [] };

const planListReducer = (state = initialState, action) => {
  switch (action.type) {
    case action.type === actionTypes.planList.GET_PLANS:
      return {
        selectedPlan: state.selectedPlan,
        plans: action.plans
      };

    case action.type === actionTypes.planList.SET_SELECTED_PLAN:
      return {
        selectedPlan: action.selectedPlan,
        plans: state.plans
      };

    case action.type === actionTypes.planList.DELETE_PLANS:
      return {
        selectedPlan: state.selectedPlan,
        plans: deletePlan(state.plans, action.planId)
      };
    default:
      return state;
  }
};

export default planListReducer;
