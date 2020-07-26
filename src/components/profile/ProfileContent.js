import React from "react";
import Plans from "./Plans";
import PropTypes from "prop-types";

const ProfileContent = props => {
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
