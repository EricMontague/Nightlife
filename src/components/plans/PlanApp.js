import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CreatePlan from "./CreatePlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import DocumentTitle from "../navigation/DocumentTitle";
import useModalState from "../../hooks/useModalState";
import useDiscoverState from "../../hooks/useDiscoverState";
import {
  addPlanDetails,
  updatePlanDetails,
  resetPlanDetails,
  storePlanInFirestore,
  updatePlanInFirestore
} from "../../redux/actions/plan";
import {
  addPlace,
  deletePlace,
  fetchPlanAndPlaces,
  getPlaceList,
  resetPlaceList
} from "../../redux/actions/placeList";
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
  const currentPlan = useSelector(state => state.planReducer);

  const [selectedPlace, setSelectedPlaceState] = useState(null);
  const [sortOrder, setSortOrder] = useState(constants.SORT_BY_KEY);

  const [isPlaceModalVisible, togglePlaceModal] = useModalState(false);
  const [discoverState, setDiscoverState] = useDiscoverState({
    isDiscoverView: false,
    discoverMode: splitPath[splitPath.length - 1]
  });
  const [mousedOverPlaceId, setMousedOverPlaceId] = useState("");

  // componentDidMount + componentWillUnmount
  useEffect(() => {
    const page = splitPath[splitPath.length - 1];
    const planId = splitPath[2];
    handlePageChange(page, planId);
    // Cleanup scripts
    return () => {
      enableScrollY();
      const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
      if (hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
        removeGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
      }
    };
  }, []);

  // componentDidUpdate
  useEffect(() => {
    const page = splitPath[splitPath.length - 1];
    const planId = splitPath[2];
    if (discoverState.discoverMode !== page) {
      handlePageChange(page, planId);
      togglePlaceModal(false);
      setDiscoverState({
        isDiscoverView: false,
        discoverMode: page
      });
    }
  });

  const handlePageChange = (page, planId) => {
    if (isCreatePage(page)) {
      resetStoreAndComponentState();
    } else if (isEdittingOrViewPage(page)) {
      dispatch(fetchPlanAndPlaces(props.currentUser.userId, planId));
    }
  };

  const isEdittingOrViewPage = page => {
    return (
      page === constants.DISCOVER_MODE.EDIT ||
      page === constants.DISCOVER_MODE.VIEW
    );
  };

  const isCreatePage = page => {
    return page === constants.DISCOVER_MODE.CREATE;
  };

  const resetStoreAndComponentState = () => {
    setSelectedPlaceState(null);
    setSortOrder("");
    dispatch(resetPlanDetails());
    dispatch(resetPlaceList());
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

  const storePlanInFirestoreHandler = () => {
    dispatch(
      storePlanInFirestore(props.currentUser.userId, [...places], {
        ...currentPlan
      })
    ).then(successful => {
      if (successful) {
        props.history.push(`/users/${props.currentUser.displayName}`);
      }
    });
  };

  const updatePlanInFirestoreHandler = () => {
    dispatch(
      updatePlanInFirestore(props.currentUser.userId, [...places], {
        ...currentPlan
      })
    ).then(successful => {
      if (successful) {
        props.history.push(`/users/${props.currentUser.displayName}`);
      }
    });
  };

  const togglePlaceModalHandler = place => {
    togglePlaceModal(!isPlaceModalVisible);
    setSelectedPlaceState(selectedPlace ? null : place);
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
    dispatch(getPlaceList(reorderedPlaces));
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
              updatePlan={updatePlanInFirestoreHandler}
              storePlan={storePlanInFirestoreHandler}
              toggleView={toggleView}
              toggleModal={togglePlaceModalHandler}
              places={sortedPlaces}
              isDiscoverView={discoverState.isDiscoverView}
              plan={currentPlan}
              discoverMode={discoverState.discoverMode}
              changeSortOrder={setSortOrder}
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
