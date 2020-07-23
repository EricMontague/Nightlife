import React from "react";
import Plans from "./Plans";
import PropTypes from "prop-types";

const ProfileContent = props => {
  return (
    <div className="container">
      <h1 className="section-header">View Your Plans</h1>
      <Plans
        plans={props.plans}
        handleDeleteClick={props.handleDeleteClick}
        handleEditClick={props.handleEditClick}
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
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired
};

export default ProfileContent;
