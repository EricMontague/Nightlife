import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Redirect } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import PlanDetailsModal from "./PlanDetailsModal";
import cityImage from "../../assets/city_life.jpg";
import { v4 as uuidv4 } from "uuid";

class ProfileApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
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
    this.toggleModal = this.toggleModal.bind(this);
  }

  static contextType = UserContext;

  deletePlan(planId) {
    this.setState({
      plans: this.state.plans.filter(plan => {
        return plan.id !== planId;
      })
    });
  }

  toggleModal(plan) {
    document.body.classList.toggle("no-scroll-y");
    this.setState({
      isModalVisible: !this.state.isModalVisible,
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
            handleDeleteClick={planId => this.deletePlan(planId)}
            toggleModal={plan => this.toggleModal(plan)}
          />
          {this.state.isModalVisible && (
            <PlanDetailsModal plan={this.state.selectedPlan} />
          )}
        </div>
      );
    }
  }
}

export default ProfileApp;
