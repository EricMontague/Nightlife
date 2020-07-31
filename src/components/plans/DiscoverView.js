import React from "react";
import InputGroup from "../common/InputGroup";
import Place from "./Place";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

class DiscoverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [event.target.name]: event.target.value.trim()
      })
    });
  }

  handleBlur(event) {
    if (event.target.value) {
      event.target.classList.remove("input-without-error");
      event.target.nextElementSibling.classList.remove("label-without-error");
    } else {
      event.target.classList.remove("input-without-error");
      event.target.nextElementSibling.classList.remove(
        "label-without-error",
        "label-selected"
      );
    }
  }

  handleFocus(event) {
    event.target.classList.add("input-without-error");
    event.target.nextElementSibling.classList.add("label-without-error");
    event.target.nextElementSibling.classList.add("label-selected");
  }

  render() {
    return (
      <div className="card places-section">
        <div className="sort-results">
          <label htmlFor="sort-by">Sort By</label>
          <span className="pipe">|</span>
          <select name="sort-by" id="sort-by" className="select-list">
            <option value="">Choose an option</option>
            <option value="Rating: low to high">Rating: low to high</option>
            <option value="Rating: high to low">Rating: high to low</option>
            <option value="Price: low to high">Price: low to high</option>
            <option value="Price: high to low">Price: high to low</option>
          </select>
        </div>
        <div className="card-header border-bottom mt-4 pb-2">
          <h3 className="card-title mb-2">Discover Places</h3>
          <InputGroup
            type="text"
            inputName="search"
            labelName="Search"
            autoFocus={true}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.search}
          />
        </div>
        <div className="card-body mb-3">
          <Place
            place={{
              name: "Place One",
              address: "176 Main St., Brooklyn, NY 09883",
              rating: 5,
              priciness: "$$$"
            }}
          />
          <Place
            place={{
              name: "Place Two",
              address: "176 Main St., Brooklyn, NY 09883",
              rating: 4.5,
              priciness: "$$$$"
            }}
          />
          <Place
            place={{
              name: "Place Three",
              address: "176 Main St., Brooklyn, NY 09883",
              rating: 5,
              priciness: "$$"
            }}
          />
        </div>
        <button type="button" className="btn btn-medium back-btn">
          <FontAwesomeIcon icon={["fa", "chevron-left"]} />
          Back
        </button>
        <button type="button" className="btn btn-primary float-right">
          Finish
        </button>
      </div>
    );
  }
}

DiscoverView.propTypes = {
  toggleView: PropTypes.func.isRequired
};

export default DiscoverView;
