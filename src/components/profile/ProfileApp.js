import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { getPlans, deletePlan } from "../../services/firebase";
import { Redirect } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import PlanDetailsModal from "./PlanDetailsModal";
import DeletePlanModal from "./DeletePlanModal";
import { axiosPlaceDetailsInstance } from "../../services/axiosGoogleMaps";

class ProfileApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlanDetailsModalVisible: false,
      isDeletePlanModalVisible: false,
      selectedPlan: null,
      plans: []
    };
    this.fetchPlans = this.fetchPlans.bind(this);
    this.fetchPhotoUrls = this.fetchPhotoUrls.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.togglePlanDetailsModal = this.togglePlanDetailsModal.bind(this);
    this.toggleDeletePlanModal = this.toggleDeletePlanModal.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchPlans()
      .then(plans => {
        return this.fetchPhotoUrls(plans);
      })
      .then(updatedPlans => {
        this.setState({ plans: updatedPlans });
      })
      .catch(error => {
        console.log(
          `An error occurred while retrieving plans and photos: ${error.message}`
        );
      });
  }

  async fetchPlans() {
    try {
      return await getPlans(this.context.currentUser.userId);
    } catch (error) {
      console.log(`An error occurred while retrieving plans: ${error.message}`);
    }
  }

  async fetchPhotoUrls(plans) {
    return plans.map(async plan => {
      const placeResults = await axiosPlaceDetailsInstance.get({
        params: { fields: "photo", place_id: plan.placeIds[0] }
      });
      plan.photoUrl = placeResults.photos[0].getURL();
      return plan;
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
