import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Redirect } from "react-router-dom";
import { addPlan, getPlan, updatePlan } from "../../services/firebase";
import CreatePlan from "./CreatePlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../../services/dateTimeHelpers";
import constants from "../../services/constants";
import sortRunner from "../../algorithms/sortPlaces";
import PropTypes from "prop-types";
import {
  trimObjectFieldValues,
  removeGoogleScript,
  hasGoogleScript,
  reorderElements,
  toggleScrollY,
  enableScrollY
} from "../../services/helpers";
import Poller from "../../services/polling";

class PlanApp extends React.Component {
  constructor(props) {
    super(props);
    this.splitPath = this.props.location.pathname.split("/");
    this.state = {
      isPlaceModalVisible: false,
      isDiscoverView: false,
      discoverMode: this.splitPath[this.splitPath.length - 1],
      selectedPlace: null,
      sortOrder: "",
      plan: {
        planId: "",
        title: "",
        description: "",
        date: formatDate(new Date()),
        time: new Date().toTimeString().slice(0, 5)
      },
      places: []
    };
    this.getInitialState = this.getInitialState.bind(this);
    this.fetchPlan = this.fetchPlan.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.addPlace = this.addPlace.bind(this);
    this.updatePlan = this.updatePlan.bind(this);
    this.deletePlace = this.deletePlace.bind(this);
    this.addPlanDetails = this.addPlanDetails.bind(this);
    this.updatePlanDetails = this.updatePlanDetails.bind(this);
    this.storePlan = this.storePlan.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.togglePlaceModal = this.togglePlaceModal.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.sortPlaces = this.sortPlaces.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    // User is on the editting page
    const page = this.splitPath[this.splitPath.length - 1];
    if (
      page === constants.DISCOVER_MODE.EDIT ||
      page === constants.DISCOVER_MODE.VIEW
    ) {
      const planId = this.splitPath[2];
      const poller = new Poller(3000, 3);
      poller.start(this.getInitialState, [planId]);
    }
  }

  componentWillUnmount() {
    enableScrollY();
    const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
    if (hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
      removeGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
    }
  }

  async getInitialState(planId) {
    try {
      const userId = this.context.currentUser.userId;
      const plan = await this.fetchPlan(userId, planId);
      this.setState({
        plan
      });
      this.fetchPlaces(plan);
    } catch (error) {
      throw new Error(
        `An error occurred when setting the initial State: ${error.message}`
      );
    }
  }

  async fetchPlan(userId, planId) {
    try {
      return await getPlan(userId, planId);
    } catch (error) {
      console.log(
        `An error occurred when attempting to retrieve the plan: ${error.message}`
      );
    }
  }

  fetchPlaces(plan) {
    // const { google } = mapProps;
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    plan.placeIds.forEach(placeId => {
      const placeRequest = {
        fields: constants.PLACES_API_FIELDS,
        placeId: placeId
      };
      placesService.getDetails(placeRequest, this.setInitialState);
    });
  }

  setInitialState(placeResults, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const place = {
        placeId: placeResults.place_id,
        name: placeResults.name,
        businessStatus: placeResults.business_status,
        formattedAddress: placeResults.formatted_address,
        location: placeResults.geometry.location,
        openingHours: placeResults.opening_hours,
        photos: placeResults.photos,
        priceLevel: placeResults.price_level || constants.DEFAULT_PRICE_LEVEL,
        rating: placeResults.rating || constants.DEFAULT_RATING,
        website: placeResults.website
      };

      this.setState({
        places: [...this.state.places, place]
      });
    } else {
      console.log(`There was an error fetching place details data: ${status}`);
    }
  }

  addPlace(placeResults, input) {
    // Clear input
    input.value = "";
    const newPlace = {
      placeId: placeResults.place_id,
      name: placeResults.name,
      businessStatus: placeResults.business_status,
      formattedAddress: placeResults.formatted_address,
      location: placeResults.geometry.location,
      openingHours: placeResults.opening_hours,
      photos: placeResults.photos,
      priceLevel: placeResults.price_level || constants.DEFAULT_PRICE_LEVEL,
      rating: placeResults.rating || constants.DEFAULT_RATING,
      website: placeResults.website
    };
    const existingPlace = this.state.places.find(place => {
      return place.placeId === newPlace.placeId;
    });
    if (!existingPlace) {
      this.setState({
        places: [...this.state.places, newPlace]
      });
    }
  }

  deletePlace(placeId) {
    this.setState({
      places: this.state.places.filter(place => place.placeId !== placeId)
    });
  }

  // Add or update a plan
  addPlanDetails(plan) {
    const trimmedPlan = trimObjectFieldValues(plan);
    this.setState({
      plan: {
        planId: uuidv4(),
        ...trimmedPlan
      }
    });
  }

  updatePlanDetails(plan) {
    const trimmedPlan = trimObjectFieldValues(plan);
    this.setState({
      plan: {
        planId: this.state.plan.planId,
        ...trimmedPlan
      }
    });
  }

  // Google doesn't allow storage of Places API data for more than 30 days,
  // with the sole exception being the the placeId attribute.
  // Based on their terms and conditions, the placeId can be stored indefinitely
  // https://developers.google.com/places/web-service/policies

  async storePlan() {
    if (this.state.places.length === 0) {
      console.log("Please choose at least one place.");
    } else {
      const plan = { ...this.state.plan };
      plan.placeIds = this.state.places.map(place => place.placeId);
      try {
        await addPlan(this.context.currentUser.userId, plan);
      } catch (error) {
        console.log(`Error in saving plan information: ${error.message}`);
      }
      this.props.history.push(`/users/${this.context.currentUser.displayName}`);
    }
  }

  async updatePlan() {
    if (this.state.places.length === 0) {
      console.log("Please choose at least one place.");
    } else {
      const plan = { ...this.state.plan };
      plan.placeIds = this.state.places.map(place => place.placeId);
      try {
        await updatePlan(this.context.currentUser.userId, plan);
      } catch (error) {
        console.log(`Error in updating plan information: ${error.message}`);
      }
      this.props.history.push(`/users/${this.context.currentUser.displayName}`);
    }
  }

  toggleView() {
    this.setState({ isDiscoverView: !this.state.isDiscoverView });
  }

  togglePlaceModal(place) {
    toggleScrollY();
    this.setState({
      isPlaceModalVisible: !this.state.isPlaceModalVisible,
      selectedPlace: this.state.selectedPlace ? null : place
    });
  }

  changeSortOrder(sortOrder) {
    this.setState({ sortOrder });
  }

  sortPlaces(places) {
    return sortRunner(places, this.state.sortOrder);
  }

  dragStartHandler() {
    console.log("Dragging started!");
  }

  dragEndHandler(result) {
    console.log("Dragging ended");
    const { destination, source } = result;

    // dropped outside of list
    if (!destination) {
      console.log("Not destination");
      return;
    }

    // reorder places array
    const reorderedPlaces = reorderElements(
      this.state.places,
      source.index,
      destination.index
    );

    // set state
    this.setState({
      places: reorderedPlaces
    });
  }

  render() {
    if (!this.context.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const sortedPlaces = this.sortPlaces(this.state.places);

    return (
      <>
        <div className="discover-container">
          <div className="google-map">
            <Map toggleModal={place => this.togglePlaceModal(place)} />
          </div>
          <div className="user-actions">
            <CreatePlan
              addPlace={this.addPlace}
              deletePlace={placeId => this.deletePlace(placeId)}
              setPlanDetails={plan =>
                this.state.discoverMode === constants.DISCOVER_MODE.CREATE
                  ? this.addPlanDetails(plan)
                  : this.updatePlanDetails(plan)
              }
              updatePlan={this.updatePlan}
              storePlan={this.storePlan}
              toggleView={this.toggleView}
              toggleModal={this.togglePlaceModal}
              places={sortedPlaces}
              isDiscoverView={this.state.isDiscoverView}
              plan={this.state.plan}
              discoverMode={this.state.discoverMode}
              changeSortOrder={this.changeSortOrder}
              dragEndHandler={this.dragEndHandler}
              dragStartHandler={this.dragStartHandler}
            />
          </div>
        </div>
        {this.state.isPlaceModalVisible && (
          <PlaceDetailsModal
            place={this.state.selectedPlace}
            toggleModal={place => this.togglePlaceModal(place)}
          />
        )}
      </>
    );
  }
}

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
