import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { trimObjectFieldValues } from "../utils/commonHelpers";

const usePlanState = initialState => {
  const [currentPlan, setPlanState] = useState(initialState);

  const addPlan = newPlan => {
    const trimmedPlan = trimObjectFieldValues(newPlan);

    setPlanState({
      planId: uuidv4(),
      ...trimmedPlan
    });
  };

  const updatePlan = updatedPlan => {
    const trimmedPlan = trimObjectFieldValues(updatedPlan);
    setPlanState({
      planId: currentPlan.planId,
      ...trimmedPlan
    });
  };

  return [currentPlan, addPlan, updatePlan];
};

export default usePlanState;
