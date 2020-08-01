import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Redirect, Switch, Route, matchPath } from "react-router-dom";
import CreatePlan from "./CreatePlan";
import EditPlan from "./EditPlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

class PlanApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaceModalVisible: false,
      isDiscoverView: true,
      selectedPlace: null,
      plan: {
        id: uuidv4(),
        title: "",
        description: "",
        datetime: new Date()
      },
      places: [
        {
          name: "Place One",
          address: "176 Main St., Brooklyn, NY 09883",
          rating: 5,
          priciness: "$$$"
        },
        {
          name: "Place Two",
          address: "176 Main St., Brooklyn, NY 09883",
          rating: 4.5,
          priciness: "$$$$"
        },
        {
          name: "Place Three",
          address: "176 Main St., Brooklyn, NY 09883",
          rating: 5,
          priciness: "$$"
        }
      ]
    };
    this.fetchPlace = this.fetchPlace.bind(this);
    this.deletePlace = this.deletePlace.bind(this);
    this.setPlanDetails = this.setPlanDetails.bind(this);
    this.storePlan = this.storePlan.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.togglePlaceModal = this.togglePlaceModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  static contextType = UserContext;

  componentDidMount() {
    const match = matchPath(this.props.match.path, {
      path: "/plans/:plan_id/edit",
      exact: true,
      strict: false
    });
    if (match) {
      const plans = this.context.currentUser.plans;
      const currentPlan = plans.find(plan => {
        return plan.id === parseInt(match.params.id);
      });
      if (!currentPlan) {
        this.props.history.push(
          `/users/${this.context.currentUser.displayName}`
        );
      }
      currentPlan.placeIds.forEach(placeId => {
        console.log("Make call to Google Place API");
      });
      console.log("Get places from firestore that are part of a given plan");
    }
  }

  fetchPlace(place) {
    console.log("Making API call");
    // this.setState({
    //   places: [...this.state.places, { ...place, id: uuidv4() }]
    // });
  }

  deletePlace(placeId) {
    this.setState({
      places: this.state.places.filter(place => place.id !== placeId)
    });
  }

  // Add or update a plan
  setPlanDetails(plan) {
    this.setState({
      id: this.state.id,
      ...plan
    });
  }

  storePlan() {
    // Google doesn't allow storage of API data unless it's something small, so
    // I'm just storing the placeIds so that API calls can be made in other parts
    // of the application for places data
    const plan = { ...this.state.plan };
    plan.placeIds = this.state.places.map(place => place.id);
    this.context.savePlan(plan);
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

  renderContent() {
    return (
      <Switch>
        <Route exact path="/plans/create">
          <CreatePlan
            fetchPlace={place => this.fetchPlace(place)}
            deletePlace={placeId => this.deletePlace(placeId)}
            setPlanDetails={plan => this.setPlanDetails(plan)}
            storePlan={this.storePlan}
            toggleView={this.toggleView}
            toggleModal={place => this.togglePlaceModal(place)}
            places={this.state.places}
            isDiscoverView={this.state.isDiscoverView}
          />
        </Route>
        <Route exact path="/plans/:plan_id/edit">
          <EditPlan
            fetchPlace={place => this.fetchPlace(place)}
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
    );
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
          <div className="user-actions">{this.renderContent()}</div>
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
