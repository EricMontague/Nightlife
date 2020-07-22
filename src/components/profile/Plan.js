import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Plan = props => {
  return (
    <div className="panel">
      <img src={props.plan.image} alt="Plan image" />
      <div className="panel-body">
        <h3 className="panel-title">{props.plan.title}</h3>
        <div className="panel-content">
          <p>{props.plan.description}</p>
        </div>
        <div className="panel-footer space-between">
          <div className="flex align-items space-between">
            <p>Start datetime: {props.plan.datetime}</p>
            <p>{props.plan.placeIds.length} Places</p>
          </div>
          <div className="flex align-items space-between">
            <FontAwesomeIcon icon={["fa", "edit"]} />
            <FontAwesomeIcon icon={["fa", "trash-alt"]} />
          </div>
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
    datetime: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired
};
