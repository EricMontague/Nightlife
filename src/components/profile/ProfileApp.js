import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../navigation/DocumentTitle";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import PlanDetailsModal from "./PlanDetailsModal";
import DeletePlanModal from "./DeletePlanModal";
import useModalState from "../../hooks/useModalState";
import { fetchPlansAndPhotos } from "../../redux/actions/planList";
import { deleteUserPlan } from "../../redux/actions/planList";
import {
  hasGoogleScript,
  loadGoogleScript
} from "../../utils/googleMapsHelpers";
import { enableScrollY } from "../../utils/commonHelpers";
import constants from "../../utils/constants";
import { sortByDatetime } from "../../algorithms/sorting";

const ProfileApp = props => {
  // Declare hooks
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlanState] = useState(null);
  const plans = useSelector(state => state.planListReducer.plans);
  const [isPlanDetailsModalVisible, togglePlanDetailsModal] = useModalState();
  const [isDeletePlanModalVisible, toggleDeletePlanModal] = useModalState();

  // necessary to properly setup the callback for the places API

  window.fetchPlansAndPhotos = () =>
    dispatch(fetchPlansAndPhotos(props.currentUser.userId));

  // set initial state
  useEffect(() => {
    const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
    if (!hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
      urlParameters.push("callback=fetchPlansAndPhotos");
      loadGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
    } else {
      dispatch(fetchPlansAndPhotos(props.currentUser.userId));
    }

    return () => enableScrollY();
  }, []);

  // Declare callbacks

  const togglePlanDetailsModalHandler = selectedPlan => {
    togglePlanDetailsModal(!isPlanDetailsModalVisible);
    setSelectedPlanState(selectedPlan);
  };

  const toggleDeletePlanModalHandler = plan => {
    toggleDeletePlanModal(!isDeletePlanModalVisible);
    setSelectedPlanState(selectedPlan ? null : plan);
  };

  const deletePlanHandler = planId => {
    dispatch(deleteUserPlan(props.currentUser.userId, planId));
  };

  // Sort plans
  const reverse = true;
  const sortedPlans = sortByDatetime(plans, reverse);

  return (
    <DocumentTitle title={`${props.currentUser.displayName} | Nightlife`}>
      <div>
        <ProfileHeader
          isLoggedIn={props.isLoggedIn}
          currentUser={props.currentUser}
        />
        <ProfileContent
          plans={sortedPlans}
          toggleDeletePlanModal={toggleDeletePlanModalHandler}
          togglePlanDetailsModal={togglePlanDetailsModalHandler}
        />
        {isPlanDetailsModalVisible && (
          <PlanDetailsModal
            plan={selectedPlan}
            toggleModal={togglePlanDetailsModalHandler}
          />
        )}
        {isDeletePlanModalVisible && (
          <DeletePlanModal
            toggleModal={toggleDeletePlanModalHandler}
            handleDeleteClick={deletePlanHandler}
            plan={selectedPlan}
          />
        )}
      </div>
    </DocumentTitle>
  );
};

ProfileApp.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired),
  isLoggedIn: PropTypes.bool.isRequired
};

export default ProfileApp;
