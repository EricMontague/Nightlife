import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CreatePlan from "./CreatePlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import DocumentTitle from "../navigation/DocumentTitle";
import useModalState from "../../hooks/useModalState";
import useDiscoverState from "../../hooks/useDiscoverState";
import { addPlanDetails, updatePlanDetails } from "../../redux/actions/plan";
import {
  addPlace,
  deletePlace,
  fetchPlanAndPlaces,
  setSelectedPlace,
  setSortOrder,
  setPlaceList
} from "../../redux/actions/placeList";
import { addPlan, updatePlan } from "../../firebase/plans";
import { formatDate } from "../../utils/dateTimeHelpers";
import constants from "../../utils/constants";
import { enableScrollY } from "../../utils/commonHelpers";
import {
  removeGoogleScript,
  hasGoogleScript
} from "../../utils/googleMapsHelpers";
import { reorderPlaces } from "../../algorithms/reorder";
import sortPlaces from "../../algorithms/sorting";

const PlanApp = props => {
  // Variable declarations
  let splitPath = props.location.pathname.split("/");

  // Declare hooks
  const dispatch = useDispatch();
  const places = useSelector(state => state.placeListReducer.places);
  const selectedPlace = useSelector(
    state => state.placeListReducer.selectedPlace
  );
  const currentPlan = useSelector(state => state.planReducer);

  const sortOrder = useSelector(state => state.placeListReducer.sortOrder);
  const [isPlaceModalVisible, togglePlaceModal] = useModalState(false);
  const [discoverState, setDiscoverState] = useDiscoverState({
    isDiscoverView: false,
    discoverMode: splitPath[splitPath.length - 1]
  });
  const [mousedOverPlaceId, setMousedOverPlaceId] = useState("");

  // componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log("PlanApp mount");
    // User is on the editting page
    const page = splitPath[splitPath.length - 1];
    if (isCreatePage(page)) {
      resetPlanAndPlaceList();
    } else if (isEdittingOrViewPage(page)) {
      const planId = splitPath[2];
      dispatch(fetchPlanAndPlaces(props.currentUser.userId, planId));
    }

    // Cleanup scripts
    return () => {
      console.log("PlanApp unmount");
      enableScrollY();
      const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
      if (hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
        removeGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
      }
    };
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log("PlanApp update");
    splitPath = props.location.pathname.split("/");
    const mode = splitPath[splitPath.length - 1];
    if (discoverState.discoverMode !== mode) {
      console.log("reset");
      togglePlaceModal(false);
      setDiscoverState({
        isDiscoverView: false,
        discoverMode: mode
      });
      resetPlanAndPlaceList();
    }
  });

  const isEdittingOrViewPage = page => {
    return (
      page === constants.DISCOVER_MODE.EDIT ||
      page === constants.DISCOVER_MODE.VIEW
    );
  };

  const isCreatePage = page => {
    return page === constants.DISCOVER_MODE.CREATE;
  };

  const resetPlanAndPlaceList = () => {
    dispatch(setSelectedPlace(null));
    dispatch(setSortOrder(""));
    const defaultPlan = {
      planId: "",
      title: "",
      description: "",
      date: formatDate(new Date()),
      time: new Date().toTimeString().slice(0, 5)
    };
    dispatch(addPlanDetails(defaultPlan));
    dispatch(setPlaceList([]));
  };

  // Declare callbacks
  const addPlandDetailsHandler = plan => {
    dispatch(addPlanDetails(plan));
  };

  const updatePlanDetailsHandler = plan => {
    dispatch(updatePlanDetails({ ...plan, planId: currentPlan.planId }));
  };

  const addPlaceHandler = (placeResults, input) => {
    dispatch(addPlace(placeResults, input, places.length));
  };

  const deletePlaceHandler = placeId => {
    dispatch(deletePlace(placeId));
  };

  const setSortOrderHandler = sortOrder => {
    // need to remove this dispatch. Keeping the sortOrder in state is unecessary
    dispatch(setSortOrder(sortOrder));
  };

  const stripPlaces = placesList => {
    return placesList.map((place, index) => {
      return { placeId: place.placeId, sortKey: index };
    });
  };

  // Google doesn't allow storage of Places API data for more than 30 days,
  // with the sole exception being the the placeId attribute.
  // Based on their terms and conditions, the placeId can be stored indefinitely
  // https://developers.google.com/places/web-service/policies
  const storePlanInFirestore = async () => {
    console.log("store Plan");
    if (places.length === 0) {
      console.log("Please choose at least one place.");
    } else {
      const plan = { ...currentPlan };
      plan.places = stripPlaces(places);
      try {
        await addPlan(props.currentUser.userId, plan);
      } catch (error) {
        console.log(`Error in saving plan information: ${error.message}`);
      }

      props.history.push(`/users/${props.currentUser.displayName}`);
    }
  };

  const updatePlanInFirestore = async () => {
    console.log("updatePlan");
    if (places.length === 0) {
      console.log("Please choose at least one place.");
    } else {
      const plan = { ...currentPlan };

      plan.places = stripPlaces(places);

      try {
        await updatePlan(props.currentUser.userId, plan);
      } catch (error) {
        console.log(`Error in updating plan information: ${error.message}`);
      }
      props.history.push(`/users/${props.currentUser.displayName}`);
    }
  };

  const togglePlaceModalHandler = place => {
    togglePlaceModal(!isPlaceModalVisible);
    dispatch(setSelectedPlace(selectedPlace ? null : place));
  };

  const toggleView = () => {
    setDiscoverState({
      ...discoverState,
      isDiscoverView: !discoverState.isDiscoverView
    });
  };

  const dragEndHandler = result => {
    const { destination, source } = result;

    // dropped outside of list
    if (!destination) {
      return;
    }

    // reorder places array
    const reorderedPlaces = reorderPlaces(
      places,
      source.index,
      destination.index
    );

    // set state
    // dispatch(setSortOrder(constants.SORT_BY_USER_INPUT));
    dispatch(setPlaceList(reorderedPlaces));
  };

  const sortedPlaces = useMemo(() => {
    return sortPlaces(places, sortOrder);
  }, [sortOrder, places]);

  // Sort places

  return (
    <DocumentTitle
      title={`${discoverState.discoverMode[0].toUpperCase() +
        discoverState.discoverMode.slice(1)} Plan | Nightlife`}
    >
      <>
        <div className="discover-container">
          <div className="google-map">
            <Map
              toggleModal={togglePlaceModalHandler}
              places={sortedPlaces}
              shouldRenderMarkers={
                discoverState.isDiscoverView ||
                discoverState.discoverMode === constants.DISCOVER_MODE.VIEW
              }
              handleMouseover={setMousedOverPlaceId}
              handleMouseout={() => setMousedOverPlaceId("")}
            />
          </div>
          <div className="user-actions">
            <CreatePlan
              addPlace={addPlaceHandler}
              deletePlace={deletePlaceHandler}
              setPlanDetails={
                discoverState.discoverMode === constants.DISCOVER_MODE.CREATE
                  ? addPlandDetailsHandler
                  : updatePlanDetailsHandler
              }
              updatePlan={updatePlanInFirestore}
              storePlan={storePlanInFirestore}
              toggleView={toggleView}
              toggleModal={togglePlaceModalHandler}
              places={sortedPlaces}
              isDiscoverView={discoverState.isDiscoverView}
              plan={currentPlan}
              discoverMode={discoverState.discoverMode}
              changeSortOrder={setSortOrderHandler}
              dragEndHandler={dragEndHandler}
              mousedOverPlaceId={mousedOverPlaceId}
            />
          </div>
        </div>
        {isPlaceModalVisible && (
          <PlaceDetailsModal
            place={selectedPlace}
            toggleModal={togglePlaceModalHandler}
          />
        )}
      </>
    </DocumentTitle>
  );
};

PlanApp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      state: PropTypes.objectOf(PropTypes.string.isRequired)
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  })
};

export default PlanApp;
