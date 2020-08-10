import React from "react";
import Plans from "./Plans";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileContent = props => {
  if (props.plans.length === 0) {
    return (
      <div className="container text-center pb-3">
        <h3 className="mb-2 font-size-md">
          Looks like you still need to make some plans!
        </h3>
        <Link to="/plans/create" className="btn btn-primary">
          Create Plan
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="section-header">View Your Plans</h1>
        <Plans
          plans={props.plans}
          toggleDeletePlanModal={props.toggleDeletePlanModal}
          togglePlanDetailsModal={props.togglePlanDetailsModal}
        />
      </div>
    );
  }
};

ProfileContent.propTypes = {
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
  toggleDeletePlanModal: PropTypes.func.isRequired,
  togglePlanDetailsModal: PropTypes.func.isRequired
};

export default ProfileContent;
