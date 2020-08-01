import React from "react";
import DiscoverView from "./DiscoverView";
import PlanDetailsForm from "./PlanDetailsForm";
import PropTypes from "prop-types";

const CreatePlan = props => {
  if (props.isDiscoverView) {
    return (
      <DiscoverView
        handleBackClick={props.toggleView}
        handleFinishClick={props.storePlan}
        handlePlaceSelected={props.fetchPlace}
        handleDeleteClick={props.deletePlace}
        places={props.places}
      />
    );
  } else {
    return (
      <PlanDetailsForm
        toggleView={props.toggleView}
        setPlanDetails={props.setPlanDetails}
      />
    );
  }
};

CreatePlan.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  deletePlace: PropTypes.func.isRequired,
  fetchPlace: PropTypes.func.isRequired,
  storePlan: PropTypes.func.isRequired,
  isDiscoverView: PropTypes.bool.isRequired,
  setPlanDetails: PropTypes.func.isRequired
};

export default CreatePlan;
