import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { addPlan, getPlan } from "../../services/firebase";
import { matchPath } from "react-router-dom";
import CreatePlan from "./CreatePlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../../services/dateTimeHelpers";
import constants from "../../services/constants";
import sortRunner from "../../algorithms/sortPlaces";
import PropTypes from "prop-types";

class PlanApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaceModalVisible: false,
      isDiscoverView: false,
      isReadOnly: this.props.match.path.includes(constants.DISCOVER_MODE.VIEW),
      selectedPlace: null,
      sortOrder: "",
      plan: {
        planId: "",
        title: "",
        description: "",
        date: formatDate(new Date()),
        time: new Date().toTimeString().slice(0, 5)
      },
      places: [
        // {
        //   placeId: "12345",
        //   name: "Place One",
        //   businessStatus: "OPERATIONAL",
        //   formattedAddress: "1421 Sansom St, Philadelphia, PA 19102, USA",
        //   location: { lat: "Lat function here", lng: "Lng function here" },
        //   openingHours: {
        //     isOpen: "isOpen function",
        //     periods: [],
        //     weekdayText: []
        //   },
        //   icon: "",
        //   photos: [],
        //   priceLevel: 2,
        //   rating: 4.4,
        //   website: "http://www.tinder.com"
        // }
      ]
    };
    this.fetchPlan = this.fetchPlan.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.addPlace = this.addPlace.bind(this);
    this.deletePlace = this.deletePlace.bind(this);
    this.setPlanDetails = this.setPlanDetails.bind(this);
    this.storePlan = this.storePlan.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.togglePlaceModal = this.togglePlaceModal.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.sortPlaces = this.sortPlaces.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    const matchEditPath = matchPath(this.props.match.path, {
      path: "/plans/:plan_id/edit",
      exact: true,
      strict: false
    });
    const matchReadOnlyPath = matchPath(this.props.match.path, {
      path: "/plans/:plan_id/view",
      exact: true,
      strict: false
    });
    // User is on the editting page
    if (matchEditPath || matchReadOnlyPath) {
      const splitPath = this.props.location.pathname.split("/");
      this.getInitialState(this.context.currentUser.userId, splitPath[2]);
    }
  }

  async getInitialState(userId, planId) {
    try {
      const plan = await this.fetchPlan(userId, planId);
      this.setInitialState(plan);
    } catch (error) {
      console.log(
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

  setInitialState(plan) {
    // const { google } = mapProps;
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const placeIds = plan.placeIds;
    delete plan.placeIds;
    placeIds.forEach(placeId => {
      placesService.getDetails(
        {
          fields: constants.PLACES_API_FIELDS,
          placeId: placeId
        },
        (placeResults, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const place = {
              placeId: placeResults.place_id,
              name: placeResults.name,
              businessStatus: placeResults.business_status,
              formattedAddress: placeResults.formatted_address,
              location: placeResults.geometry.location,
              openingHours: placeResults.opening_hours,
              icon: placeResults.icon,
              photos: placeResults.photos,
              priceLevel: placeResults.price_level,
              rating: placeResults.rating,
              website: placeResults.website
            };

            this.setState({
              plan: plan,
              places: [...this.state.places, place]
            });
          } else {
            console.log(
              `There was an error fetching place details data: ${status}`
            );
          }
        }
      );
    });
  }

  addPlace(placeResults, input) {
    // Clear input
    input.value = "";

    this.setState({
      places: [
        ...this.state.places,
        {
          placeId: placeResults.place_id,
          name: placeResults.name,
          businessStatus: placeResults.business_status,
          formattedAddress: placeResults.formatted_address,
          location: placeResults.geometry.location,
          openingHours: placeResults.opening_hours,
          icon: placeResults.icon,
          photos: placeResults.photos,
          priceLevel: placeResults.price_level,
          rating: placeResults.rating,
          website: placeResults.website
        }
      ]
    });
  }

  deletePlace(placeId) {
    this.setState({
      places: this.state.places.filter(place => place.placeId !== placeId)
    });
  }

  // Add or update a plan
  setPlanDetails(plan) {
    this.setState({
      plan: {
        planId: uuidv4(),
        ...plan
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
        this.props.history.push(
          `/users/${this.context.currentUser.displayName}`
        );
      } catch (error) {
        console.log(`Error in saving plan information: ${error.message}`);
      }
    }
  }

  async updatePlan() {}

  toggleView() {
    this.setState({ isDiscoverView: !this.state.isDiscoverView });
  }

  togglePlaceModal(place) {
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

  render() {
    // if (!this.context.isLoggedIn) {
    //   return <Redirect to="/" />;
    // } else {

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
              setPlanDetails={plan => this.setPlanDetails(plan)}
              storePlan={this.storePlan}
              toggleView={this.toggleView}
              toggleModal={place => this.togglePlaceModal(place)}
              places={sortedPlaces}
              isDiscoverView={this.state.isDiscoverView}
              plan={this.state.plan}
              isReadOnly={this.state.isReadOnly}
              changeSortOrder={this.changeSortOrder}
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
