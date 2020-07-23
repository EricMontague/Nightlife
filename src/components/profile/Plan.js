import React from "react";
import { formatDateTime } from "../../services/dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Plan = props => {
  console.log(props.plan.datetime);
  return (
    <div className="plan-card" onClick={() => console.log("Show itinerary")}>
      <div className="plan-card-image-wrapper">
        <img src={props.plan.image} alt="Plan" />
      </div>
      <div className="plan-card-body">
        <h3 className="plan-card-title">{props.plan.title}</h3>
        <div className="flex align-items space-between">
          <p className="text-medium font-size-sm">
            {formatDateTime(props.plan.datetime)}
          </p>
        </div>
        <div className="plan-card-content py-1">
          <p>{props.plan.description}</p>
        </div>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon
          className="ellipsis-v"
          icon={["fa", "ellipsis-v"]}
          onClick={() => console.log("Show dropdown")}
        />
      </div>
    </div>
  );
};

export default Plan;

Plan.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    datetime: PropTypes.instanceOf(Date).isRequired,
    image: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired
};
