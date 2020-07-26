import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Redirect } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import PlanDetailsModal from "./PlanDetailsModal";
import DeletePlanModal from "./DeletePlanModal";
import cityImage from "../../assets/city_life.jpg";
import { v4 as uuidv4 } from "uuid";

class ProfileApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlanDetailsModalVisible: false,
      isDeletePlanModalVisible: false,
      selectedPlan: null,
      plans: [
        {
          id: uuidv4(),
          title: "Plan Title One",
          description:
            "Try reading numbers from left to right. As you go left to right, you insert values in decreasing magnitude: year, month, day, hours, minutes.",
          datetime: new Date(),
          image: cityImage,
          placeIds: [uuidv4(), uuidv4(), uuidv4()]
        },
        {
          id: uuidv4(),
          title: "Plan Title Two",
          description:
            "Try reading numbers from left to right. As you go left to right, you insert values in decreasing magnitude: year, month, day, hours, minutes.",
          datetime: new Date(),
          image: cityImage,
          placeIds: [uuidv4(), uuidv4(), uuidv4()]
        },
        {
          id: uuidv4(),
          title: "Plan Title Three",
          description:
            "Try reading numbers from left to right. As you go left to right, you insert values in decreasing magnitude: year, month, day, hours, minutes.",
          datetime: new Date(),
          image: cityImage,
          placeIds: [uuidv4(), uuidv4(), uuidv4()]
        }
      ]
    };
    this.deletePlan = this.deletePlan.bind(this);
    this.togglePlanDetailsModal = this.togglePlanDetailsModal.bind(this);
    this.toggleDeletePlanModal = this.toggleDeletePlanModal.bind(this);
  }

  static contextType = UserContext;

  deletePlan(planId) {
    this.setState({
      plans: this.state.plans.filter(plan => {
        return plan.id !== planId;
      })
    });
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
