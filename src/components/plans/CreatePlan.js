import React from "react";
import constants from "../../services/constants";
import DiscoverView from "./DiscoverView";
import PlanDetailsForm from "./PlanDetailsForm";
import PropTypes from "prop-types";

const CreatePlan = props => {
  if (
    props.isDiscoverView ||
    props.discoverMode === constants.DISCOVER_MODE.VIEW
  ) {
    return (
      <DiscoverView
        handleBackClick={props.toggleView}
        handleFinishClick={props.storePlan}
        handlePlaceSelected={props.addPlace}
        handleDeleteClick={props.deletePlace}
        handleSelectListChange={props.changeSortOrder}
        handleUpdateClick={props.updatePlan}
        places={props.places}
        discoverMode={props.discoverMode}
        dragEndHandler={props.dragEndHandler}
        toggleModal={props.toggleModal}
        mousedOverPlaceId={props.mousedOverPlaceId}
      />
    );
  } else {
    return (
      <PlanDetailsForm
        toggleView={props.toggleView}
        handleFormSubmission={props.setPlanDetails}
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
  updatePlan: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    planId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string)
  }),
  places: PropTypes.arrayOf(
    PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      formattedAddress: PropTypes.string.isRequired,
      location: PropTypes.objectOf(PropTypes.func.isRequired),
      openingHours: PropTypes.shape({
        isOpen: PropTypes.func.isRequired,
        periods: PropTypes.arrayOf(
          PropTypes.shape({
            close: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            }),
            open: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            })
          })
        )
      }),
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          getUrl: PropTypes.func.isRequired,
          height: PropTypes.number.isRequired,
          html_attributions: PropTypes.arrayOf(PropTypes.string.isRequired),
          width: PropTypes.number.isRequired
        })
      ),
      priceLevel: PropTypes.number,
      rating: PropTypes.number,
      website: PropTypes.string
    })
  ),
  discoverMode: PropTypes.string.isRequired,
  changeSortOrder: PropTypes.func.isRequired,
  dragEndHandler: PropTypes.func.isRequired,
  mousedOverPlaceId: PropTypes.string.isRequired
};

export default CreatePlan;
