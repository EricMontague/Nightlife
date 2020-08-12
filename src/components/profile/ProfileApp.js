import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { getPlans, deletePlan } from "../../services/firebase";
import { Redirect } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import PlanDetailsModal from "./PlanDetailsModal";
import DeletePlanModal from "./DeletePlanModal";

class ProfileApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlanDetailsModalVisible: false,
      isDeletePlanModalVisible: false,
      selectedPlan: null,
      plans: []
    };

    this.hasPlacesLibraryScript = this.hasPlacesLibraryScript.bind(this);
    this.loadScriptUrl = this.loadScriptUrl.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchPlans = this.fetchPlans.bind(this);
    this.fetchPhotoUrls = this.fetchPhotoUrls.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.togglePlanDetailsModal = this.togglePlanDetailsModal.bind(this);
    this.toggleDeletePlanModal = this.toggleDeletePlanModal.bind(this);
    this.googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GCP_API_KEY}`;
    window.fetchData = this.fetchData; // necessary to properly setup the callback for the places API
  }

  static contextType = AuthContext;

  componentDidMount() {
    const placesLibrary = "&libraries=places";
    const callback = "&callback=fetchData";
    if (!this.hasPlacesLibraryScript(placesLibrary)) {
      this.loadScriptUrl(this.googleMapsScriptUrl + callback + placesLibrary);
    }
  }

  componentWillUnmount() {
    // Remove google maps script if present
    const placesLibrary = "libraries=places";
    if (this.hasPlacesLibraryScript(placesLibrary)) {
      document
        .querySelector(`script[src^="${this.googleMapsScriptUrl}"]`)
        .remove();
    }
  }

  hasPlacesLibraryScript(libraryParameters) {
    let hasPlacesLibrary = false;
    document
      .querySelectorAll(`script[src^="${this.googleMapsScriptUrl}"]`)
      .forEach(scriptTag => {
        if (scriptTag.src.includes(libraryParameters)) {
          hasPlacesLibrary = true;
        }
      });
    return hasPlacesLibrary;
  }

  loadScriptUrl(scriptUrl) {
    const scriptElement = document.createElement("script");
    scriptElement.src = scriptUrl;
    scriptElement.type = "text/javascript";
    document.body.appendChild(scriptElement);
  }

  async fetchData() {
    try {
      const plans = await this.fetchPlans();
      this.fetchPhotoUrls(plans);
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

  fetchPhotoUrls(plans) {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    plans.forEach(plan => {
      placesService.getDetails(
        {
          fields: ["photo"],
          placeId: plan.placeIds[0]
        },
        (placeResults, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const updatedPlan = {
              ...plan,
              image: placeResults.photos[0].getUrl()
            };
            this.setState({ plans: [...this.state.plans, updatedPlan] });
          } else {
            console.log(
              `There was an error retrieving the place's photo: ${status}`
            );
          }
        }
      );
    });
  }

  async deletePlan(planId) {
    let deleted = false;
    try {
      await deletePlan(planId); // firebase function
      deleted = true;
    } catch (error) {
      console.log(`Error in deleting the plan: ${error.message}`);
    }
    if (deleted) {
      this.setState({
        plans: this.state.plans.filter(plan => {
          return plan.id !== planId;
        })
      });
    }
  }

  togglePlanDetailsModal(plan) {
    document.body.classList.toggle("no-scroll-y");
    this.setState({
      isPlanDetailsModalVisible: !this.state.isPlanDetailsModalVisible,
      selectedPlan: this.state.selectedPlan ? null : plan
    });
  }

  toggleDeletePlanModal(plan) {
    document.body.classList.toggle("no-scroll-y");
    this.setState({
      isDeletePlanModalVisible: !this.state.isDeletePlanModalVisible,
      selectedPlan: this.state.selectedPlan ? null : plan
    });
  }

  render() {
    if (!this.context.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <ProfileHeader
            isLoggedIn={this.context.isLoggedIn}
            currentUser={this.context.currentUser}
          />
          <ProfileContent
            plans={this.state.plans}
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
      );
    }
  }
}

export default ProfileApp;
