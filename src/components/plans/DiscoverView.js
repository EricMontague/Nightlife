import React from "react";
import SelectList from "../common/SelectList";
import PlaceList from "./PlaceList";
import AutocompleteInputGroup from "./AutocompleteInputGroup";
import constants from "../../services/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

class DiscoverView extends React.Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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
    const title = this.props.isReadOnly ? "Your Places" : "Discover Places";
    return (
      <div className="card">
        {!this.props.isReadOnly && (
          <SelectList
            inputName="sort-by"
            labelName="Sort By"
            extraClasses="justify-end"
            handleChange={this.props.handleSelectListChange}
            isVertical={false}
            defaultValue={{ value: "", text: "Choose an option" }}
            values={[
              "Rating: low to high",
              "Rating: high to low",
              "Price: low to high",
              "Price: high to low"
            ]}
          />
        )}
        <div className="card-header border-bottom mt-4 pb-2">
          <h3 className="card-title mb-2">{title}</h3>
          {!this.props.isReadOnly && (
            <AutocompleteInputGroup
              autoFocus={true}
              handlePlaceSelected={this.props.handlePlaceSelected}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              types={["establishment"]}
              fields={constants.PLACES_API_FIELDS}
              autocompleteClassName="autocomplete"
              inputName="search"
              labelName="Search"
            />
          )}
        </div>
        <PlaceList
          places={this.props.places}
          handleDeleteClick={this.props.handleDeleteClick}
          isReadOnly={this.props.isReadOnly}
        />
        {!this.props.isReadOnly && (
          <>
            <button
              type="button"
              className="btn btn-medium back-btn"
              onClick={this.props.handleBackClick}
            >
              <FontAwesomeIcon icon={["fa", "chevron-left"]} />
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary float-right"
              onClick={this.props.handleFinishClick}
            >
              Finish
            </button>
          </>
        )}
      </div>
    );
  }
}

DiscoverView.propTypes = {
  handlePlaceSelected: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleFinishClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  handleSelectListChange: PropTypes.func.isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      businessStatus: PropTypes.string.isRequired,
      formattedAddress: PropTypes.string.isRequired,
      location: PropTypes.objectOf(PropTypes.func.isRequired),
      openingHours: PropTypes.shape({
        isOpen: PropTypes.func.isRequired,
        periods: PropTypes.arrayOf(
          PropTypes.shape({
            close: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            }),
            open: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            })
          })
        )
      }),
      icon: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          getUrl: PropTypes.func.isRequired,
          height: PropTypes.number.isRequired,
          html_attributions: PropTypes.arrayOf(PropTypes.string.isRequired),
          width: PropTypes.number.isRequired
        })
      ),
      priceLevel: PropTypes.number,
      rating: PropTypes.number,
      website: PropTypes.string
    })
  ),

  isReadOnly: PropTypes.bool.isRequired
};

export default DiscoverView;
