import React from "react";
import DiscoverView from "./DiscoverView";
import PlanDetailsForm from "./PlanDetailsForm";
import PropTypes from "prop-types";

const CreatePlan = props => {
  if (props.isDiscoverView || props.isReadOnly) {
    return (
      <DiscoverView
        handleBackClick={props.toggleView}
        handleFinishClick={props.storePlan}
        handlePlaceSelected={props.addPlace}
        handleDeleteClick={props.deletePlace}
        handleSelectListChange={props.setSortOrder}
        places={props.places}
        isReadOnly={props.isReadOnly}
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
  plan: PropTypes.shape({
    placeId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    businessStatus: PropTypes.string.isRequired,
    formattedAddress: PropTypes.string.isRequired,
    location: PropTypes.objectOf(PropTypes.func.isRequired),
    openingHours: PropTypes.shape({
      isOpen: PropTypes.func.isRequired,
      periods: PropTypes.arrayOf(PropTypes.string.isRequired),
      weekdayText: PropTypes.arrayOf(PropTypes.string.isRequired)
    }),
    icon: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired),
    priceLevel: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    website: PropTypes.string.isRequired
  }),
  isReadOnly: PropTypes.bool.isRequired,
  setSortOrder: PropTypes.func.isRequireds
};

export default CreatePlan;
