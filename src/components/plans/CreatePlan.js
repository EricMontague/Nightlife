import React from "react";
import DiscoverView from "./DiscoverView";
import PlanDetailsForm from "./PlanDetailsForm";
import PropTypes from "prop-types";

class CreatePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDiscoverView: false
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState({
      isDiscoverView: !this.state.isDiscoverView
    });
  }

  render() {
    if (this.state.isDiscoverView) {
      return <DiscoverView toggleView={this.toggleView} />;
    } else {
      return <PlanDetailsForm toggleView={this.toggleView} />;
    }
  }
}

CreatePlan.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  removePlace: PropTypes.func.isRequired,
  addPlace: PropTypes.func.isRequired,
  storePlan: PropTypes.func.isRequired
};

export default CreatePlan;
