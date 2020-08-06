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
        handlePlaceSelected={props.addPlace}
        handleDeleteClick={props.deletePlace}
        places={props.places}
      />
    );
  } else {
    return (
      <PlanDetailsForm
        toggleView={props.toggleView}
        setPlanDetails={props.setPlanDetails}
        plan={props.plan}
      />
    );
  }
};

CreatePlan.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  deletePlace: PropTypes.func.isRequired,
  addPlace: PropTypes.func.isRequired,
  storePlan: PropTypes.func.isRequired,
  isDiscoverView: PropTypes.bool.isRequired,
  setPlanDetails: PropTypes.func.isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      priciness: PropTypes.string.isRequired
    })
  ),
  plan: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default CreatePlan;
