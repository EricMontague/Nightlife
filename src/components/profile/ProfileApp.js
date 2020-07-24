import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Redirect } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import cityImage from "../../assets/city_life.jpg";
import { v4 as uuidv4 } from "uuid";

class ProfileApp extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.editPlan = this.editPlan.bind(this);
  }

  static contextType = UserContext;

  deletePlan(planId) {
    this.setState({
      plans: this.state.plans.filter(plan => {
        return plan.id !== planId;
      })
    });
  }

  editPlan(planId, updatedPlan) {
    this.setState({
      plans: this.state.plans.map(plan => {
        return plan.id === updatedPlan.id ? { ...plan, updatedPlan } : plan;
      })
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
            handleEditClick={(planId, updatedPlan) =>
              this.editPlan(planId, updatedPlan)
            }
          />
        </div>
      );
    }
  }
}

export default ProfileApp;
