import React from "react";
import PropTypes from "prop-types";

class EditPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDiscoverView: false
    };
    this.toggleView = this.toggleView.bind(this);
  }

  render() {
    return <h1>Editting a Plan</h1>;
  }
}

export default EditPlan;
