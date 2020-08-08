import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { addPlan, getPlan } from "../../services/firebase";
import { Redirect, Switch, Route, matchPath } from "react-router-dom";
import CreatePlan from "./CreatePlan";
import EditPlan from "./EditPlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../../services/dateTimeHelpers";
import { axiosPlaceDetailsInstance } from "../../services/axiosGoogleMaps";
import constants from "../../services/constants";
import PropTypes from "prop-types";

class PlanApp extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.path);
    console.log(this.props.match.url);
    this.state = {
      isPlaceModalVisible: false,
      isDiscoverView: false,
      isReadOnly: this.props.match.path.includes(constants.DISCOVER_MODE.VIEW),
      selectedPlace: null,
      plan: {
        planId: "",
        title: "",
        description: "",
        date: formatDate(new Date()),
        time: new Date().toTimeString().slice(0, 5)
      },
      places: [
        {
          placeId: "12345",
          name: "Place One",
          businessStatus: "OPERATIONAL",
          formattedAddress: "1421 Sansom St, Philadelphia, PA 19102, USA",
          location: { lat: "Lat function here", lng: "Lng function here" },
          openingHours: {
            isOpen: "isOpen function",
            periods: [],
            weekdayText: []
          },
          icon: "",
          photos: [],
          priceLevel: 2,
          rating: 4.4,
          website: "http://www.tinder.com"
        }
      ]
    };
    this.fetchPlan = this.fetchPlan.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.addPlace = this.addPlace.bind(this);
    this.deletePlace = this.deletePlace.bind(this);
    this.setPlanDetails = this.setPlanDetails.bind(this);
    this.storePlan = this.storePlan.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.togglePlaceModal = this.togglePlaceModal.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    const match = matchPath(this.props.match.path, {
      path: "/plans/:plan_id/edit",
      exact: true,
      strict: false
    });
    // User is on the editting page
    if (match) {
      this.fetchPlan(this.context.currentUser.userId, match.params.id)
        .then(plan => {
          return {
            plan,
            places: this.fetchPlaces(plan.placeIds)
          };
        })
        .then(data => {
          this.setState({ plan: data.plan, places: data.places });
        })
        .catch(error => {
          console.log(
            `An error occurred when loading the plan and places: ${error.message}`
          );
          this.props.history.push(
            `/users/${this.context.currentUser.displayName}`
          );
        });
    }
  }

  async fetchPlan(userId, planId) {
    try {
      return await getPlan(userId, parseInt(planId));
    } catch (error) {
      console.log(
        `An error occurred when attempting to retrieve the plan: ${error.message}`
      );
    }
  }

  async fetchPlaces(placeIds) {
    return placeIds.map(async placeId => {
      try {
        const placeResults = await axiosPlaceDetailsInstance.get({
          params: {
            fields: constants.PLACES_API_FIELDS.join(),
            place_id: placeId
          }
        });
        return {
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
      } catch (error) {
        console.log(
          `An error occurred while retrieving the places data: ${error.message}`
        );
      }
    });
  }

  addPlace(placeResults, input) {
    // Clear input
    input.value = "";
    console.log(placeResults);
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
    console.log("Plan details:");
    console.log(plan);
    this.setState({
      plan: {
        planId: uuidv4(),
        title: plan.title,
        description: plan.description,
        date: plan.date,
        time: plan.time
      }
    });
  }

  async storePlan() {
    // Google doesn't allow storage of API data unless it's something small, so
    // I'm just storing the placeIds so that API calls can be made in other parts
    // of the application for places data
    const plan = { ...this.state.plan };
    plan.placeIds = this.state.places.map(place => place.placeId);
    try {
      await addPlan(this.context.currentUser.userId, plan);
      this.props.history.push(`/users/${this.context.currentUser.displayName}`);
    } catch (error) {
      console.log(`Error in saving plan information: ${error.message}`);
    }
  }

  toggleView() {
    this.setState({ isDiscoverView: !this.state.isDiscoverView });
  }

  togglePlaceModal(place) {
    this.setState({
      isPlaceModalVisible: !this.state.isPlaceModalVisible,
      selectedPlace: this.state.selectedPlace ? null : place
    });
  }

  render() {
    // if (!this.context.isLoggedIn) {
    //   return <Redirect to="/" />;
    // } else {
    return (
      <>
        <div className="discover-container">
          <div className="google-map">
            <Map toggleModal={place => this.togglePlaceModal(place)} />
          </div>
          <div className="user-actions">
            <Switch>
              <Route exact path="/plans/create">
                <CreatePlan
                  addPlace={this.addPlace}
                  deletePlace={placeId => this.deletePlace(placeId)}
                  setPlanDetails={plan => this.setPlanDetails(plan)}
                  storePlan={this.storePlan}
                  toggleView={this.toggleView}
                  toggleModal={place => this.togglePlaceModal(place)}
                  places={this.state.places}
                  isDiscoverView={this.state.isDiscoverView}
                  plan={this.state.plan}
                  isReadOnly={this.state.isReadOnly}
                />
              </Route>
              <Route exact path="/plans/:plan_id/edit">
                <EditPlan
                  addPlace={this.addPlace}
                  deletePlace={placeId => this.deletePlace(placeId)}
                  setPlanDetails={plan => this.setPlanDetails(plan)}
                  storePlan={this.storePlan}
                  toggleView={this.toggleView}
                  toggleModal={place => this.togglePlaceModal(place)}
                  places={this.state.places}
                  isDiscoverView={this.state.isDiscoverView}
                  plan={this.state.plan}
                />
              </Route>
            </Switch>
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
  })
};

export default PlanApp;
