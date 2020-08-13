import React from "react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../services/dateTimeHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Plan = props => {
  return (
    <div className="plan-card">
      <div className="plan-card-image-wrapper">
        <img src={props.plan.image} alt={props.plan.title} />
      </div>
      <div className="plan-card-body">
        <h3 className="plan-card-title">{props.plan.title}</h3>
        <div className="flex-row align-items space-between">
          <p className="text-medium font-size-sm">
            {formatDateTime(new Date(props.plan.date + " " + props.plan.time))}
          </p>
        </div>
        <p className="py-1">{props.plan.description}</p>
        <div className="icons">
          <Link to={`/plans/${props.plan.planId}/edit`}>
            <FontAwesomeIcon icon={["fa", "edit"]} />
          </Link>

          <FontAwesomeIcon
            icon={["fa", "trash-alt"]}
            onClick={() => props.toggleDeletePlanModal(props.plan)}
          />
          <FontAwesomeIcon
            icon={["fa", "list-ul"]}
            onClick={() => props.togglePlanDetailsModal(props.plan)}
          />
        </div>
      </div>
    </div>
  );
};

export default Plan;

Plan.propTypes = {
  plan: PropTypes.shape({
    planId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  toggleDeletePlanModal: PropTypes.func.isRequired,
  togglePlanDetailsModal: PropTypes.func.isRequired
};
