import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Redirect } from "react-router-dom";
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
      selectedPlace: null,
      plan: {
        id: uuidv4(),
        title: "",
        description: "",
        datetime: new Date(),
        places: []
      }
    };
    this.removePlace = this.removePlace.bind(this);
    this.addPlace = this.addPlace.bind(this);
    this.storePlan = this.storePlan.bind(this);
    this.togglePlaceModal = this.togglePlaceModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  static contextType = UserContext;

  componentDidMount() {
    if (this.props.match.path == "/plans/plan_id/edit") {
      this.setState({
        plan: { ...this.context.currentUser.plan }
      });
      console.log("Get places from firestore that are part of a given plan");
    }
  }

  removePlace(placeId) {
    this.setState({
      plan: {
        places: this.state.plan.places.filter(place => {
          return place.id !== placeId;
        })
      }
    });
  }

  addPlace(place) {
    this.setState({
      plan: {
        places: [...this.state.plan.places, { ...place, id: uuidv4() }]
      }
    });
  }

  storePlan() {
    const plan = { ...this.state.plan };
    let placeIds = [];
    plan.places.forEach(place => placeIds.push(place.id));
    plan.placeIds = placeIds;
    delete plan.places;
    this.context.savePlan(plan);
  }

  togglePlaceModal(place) {
    this.setState({
      isPlaceModalVisible: !this.state.isPlaceModalVisible,
      selectedPlace: this.state.selectedPlace ? null : place
    });
  }

  renderContent() {
    const path = this.props.match.path;
    switch (path) {
      case "/plans/create":
        return (
          <CreatePlan
            toggleModal={place => this.togglePlaceModal(place)}
            removePlace={placeId => this.removePlace(placeId)}
            addPlace={place => this.addPlace(place)}
            storePlaces={this.storePlaces}
          />
        );
      case "/plans/plan_id/edit":
        return (
          <EditPlan
            plan={this.state.plan}
            toggleModal={place => this.togglePlaceModal(place)}
            removePlace={placeId => this.removePlace(placeId)}
            addPlace={place => this.addPlace(place)}
            storePlaces={this.storePlaces}
          />
        );
      default:
        return <Redirect to="/" />;
    }
  }

  render() {
    if (!this.context.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <div className="flex-row">
            <div className="flex-col">
              <Map toggleModal={place => this.togglePlaceModal(place)} />
            </div>
            <div className="flex-col">{this.renderContent()}</div>
          </div>
          <PlaceDetailsModal
            place={this.state.selectedPlace}
            toggleModal={place => this.togglePlaceModal(place)}
          />
        </>
      );
    }
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
