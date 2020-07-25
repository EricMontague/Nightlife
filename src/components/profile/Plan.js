import React from "react";
import { formatDateTime } from "../../services/dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Plan = props => {
  return (
    <div className="plan-card" onClick={() => console.log("Show itinerary")}>
      <div className="plan-card-image-wrapper">
        <img src={props.plan.image} alt={props.plan.title} />
      </div>
      <div className="plan-card-body">
        <h3 className="plan-card-title">{props.plan.title}</h3>
        <div className="flex align-items space-between">
          <p className="text-medium font-size-sm">
            {formatDateTime(props.plan.datetime)}
          </p>
        </div>
        <p className="py-1">{props.plan.description}</p>
        <div className="icons">
          <FontAwesomeIcon icon={["fa", "edit"]} />
          <FontAwesomeIcon
            icon={["fa", "trash-alt"]}
            onClick={props.handleDeleteClick}
          />
          <FontAwesomeIcon
            icon={["fa", "list-ul"]}
            onClick={() => props.toggleModal(props.plan)}
          />
        </div>
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
  toggleModal: PropTypes.func.isRequired
};
