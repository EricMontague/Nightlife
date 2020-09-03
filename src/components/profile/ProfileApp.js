import React from "react";
import { AlertContext } from "../../context/AlertProvider";
import { AuthContext } from "../../context/AuthProvider";
import { getPlans, deletePlan } from "../../services/firebase";
import {
  hasGoogleScript,
  removeGoogleScript,
  loadGoogleScript,
  disableScrollY,
  enableScrollY,
  disableNavigation,
  enableNavigation
} from "../../services/helpers";
import { sortByDatetime } from "../../algorithms/sorting";
import defaultPlacePhoto from "../../assets/default_place_image.png";
import { Redirect } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import PlanDetailsModal from "./PlanDetailsModal";
import DeletePlanModal from "./DeletePlanModal";
import constants from "../../services/constants";
import DocumentTitle from "../common/DocumentTitle";

class ProfileApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlanDetailsModalVisible: false,
      isDeletePlanModalVisible: false,
      selectedPlan: null,
      plans: []
    };

    this.getInitialState = this.getInitialState.bind(this);
    this.fetchPlans = this.fetchPlans.bind(this);
    this.fetchPlanPhotos = this.fetchPlanPhotos.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.togglePlanDetailsModal = this.togglePlanDetailsModal.bind(this);
    this.toggleDeletePlanModal = this.toggleDeletePlanModal.bind(this);

    window.getInitialState = this.getInitialState; // necessary to properly setup the callback for the places API
  }

  static contextType = AuthContext;

  componentDidMount() {
    const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
    if (!hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
      urlParameters.push("callback=" + this.getInitialState.name.slice(6));
      loadGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
    }
  }

  componentWillUnmount() {
    enableScrollY();
    // Remove google maps script if present
    const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
    if (hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
      removeGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
    }
  }

  async getInitialState() {
    try {
      const plans = await this.fetchPlans();
      this.fetchPlanPhotos(plans);
    } catch (error) {
      console.log(
        `An error occurred while retrieving plans and photos: ${error.message}`
      );
    }
  }

  async fetchPlans() {
    try {
      return await getPlans(this.context.currentUser.userId);
    } catch (error) {
      console.log(`An error occurred while retrieving plans: ${error.message}`);
    }
  }

  fetchPlanPhotos(plans) {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    plans.forEach(plan => {
      if (plan.places.length > 0) {
        const placeRequest = {
          fields: ["photo"],
          placeId: plan.places[0].placeId
        };
        placesService.getDetails(placeRequest, this.setInitialState(plan));
      }
    });
  }

  setInitialState(plan) {
    const photoOptions = {
      maxHeight: constants.GOOGLE_IMAGE_HEIGHT,
      maxWidth: constants.GOOGLE_IMAGE_WIDTH
    };
    const handlePlaceResults = (placeResults, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const photoUrl = placeResults.photos
          ? placeResults.photos[0].getUrl(photoOptions)
          : defaultPlacePhoto;
        const updatedPlan = {
          ...plan,
          image: photoUrl
        };
        this.setState({ plans: [...this.state.plans, updatedPlan] });
      } else {
        console.log(
          `There was an error retrieving the place's photo: ${status}`
        );
      }
    };
    return handlePlaceResults;
  }

  async deletePlan(planId) {
    let deleted = false;
    try {
      await deletePlan(this.context.currentUser.userId, planId); // firebase function
      deleted = true;
    } catch (error) {
      console.log(`Error in deleting the plan: ${error.message}`);
    }
    if (deleted) {
      this.setState({
        plans: this.state.plans.filter(plan => {
          return plan.planId !== planId;
        })
      });
    }
  }

  togglePlanDetailsModal(plan) {
    this.setState({
      isPlanDetailsModalVisible: !this.state.isPlanDetailsModalVisible,
      selectedPlan: this.state.selectedPlan ? null : plan
    });
  }

  toggleDeletePlanModal(plan) {
    this.setState({
      isDeletePlanModalVisible: !this.state.isDeletePlanModalVisible,
      selectedPlan: this.state.selectedPlan ? null : plan
    });
  }

  render() {
    if (!this.context.isLoggedIn) {
      return <Redirect to="/" />;
    }

    if (
      this.state.isPlanDetailsModalVisible ||
      this.state.isDeletePlanModalVisible
    ) {
      disableScrollY();
      disableNavigation();
    } else {
      enableScrollY();
      enableNavigation();
    }

    const sortedPlans = sortByDatetime(this.state.plans, true);

    return (
      <DocumentTitle
        title={`${this.context.currentUser.displayName} | Nightlife`}
      >
        <div>
          <ProfileHeader
            isLoggedIn={this.context.isLoggedIn}
            currentUser={this.context.currentUser}
          />
          <ProfileContent
            plans={sortedPlans}
            toggleDeletePlanModal={plan => this.toggleDeletePlanModal(plan)}
            togglePlanDetailsModal={plan => this.togglePlanDetailsModal(plan)}
          />
          {this.state.isPlanDetailsModalVisible && (
            <PlanDetailsModal
              plan={this.state.selectedPlan}
              toggleModal={plan => this.togglePlanDetailsModal(plan)}
            />
          )}
          {this.state.isDeletePlanModalVisible && (
            <DeletePlanModal
              toggleModal={plan => this.toggleDeletePlanModal(plan)}
              handleDeleteClick={planId => this.deletePlan(planId)}
              plan={this.state.selectedPlan}
            />
          )}
        </div>
      </DocumentTitle>
    );
  }
}

export default ProfileApp;
