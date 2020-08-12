import React from "react";
import Plan from "./Plan";
import PropTypes from "prop-types";

const Plans = props => {
  return (
    <div className="plan-cards-container">
      {props.plans.map(plan => {
        return (
          <Plan
            key={plan.planId}
            plan={plan}
            toggleDeletePlanModal={props.toggleDeletePlanModal}
            togglePlanDetailsModal={props.togglePlanDetailsModal}
          />
        );
      })}
    </div>
  );
};

Plans.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      planId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
  ),
  toggleDeletePlanModal: PropTypes.func.isRequired,
  togglePlanDetailsModal: PropTypes.func.isRequired
};

export default Plans;
