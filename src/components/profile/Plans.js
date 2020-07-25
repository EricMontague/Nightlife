import React from "react";
import Plan from "./Plan";
import PropTypes from "prop-types";

const Plans = props => {
  if (props.plans.length == 0) {
    return (
      <div className="text-center">
        <p className="mb-2 font-size-md">
          Looks like you still need to make some plans!
        </p>
        <button type="button" className="btn btn-primary btn-shadow">
          Create Plan
        </button>
      </div>
    );
  } else {
    return (
      <div className="plan-cards-container">
        {props.plans.map(plan => {
          return (
            <Plan
              key={plan.id}
              plan={plan}
              handleDeleteClick={props.handleDeleteClick}
              toggleModal={props.toggleModal}
            />
          );
        })}
      </div>
    );
  }
};

Plans.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      datetime: PropTypes.instanceOf(Date).isRequired,
      image: PropTypes.string.isRequired,
      placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
  ),
  handleDeleteClick: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Plans;
