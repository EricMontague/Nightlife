import React from "react";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Place = props => {
  let addressLine =
    "$".repeat(props.place.priceLevel) + " | " + props.place.formattedAddress;
  if (!props.place.priceLevel) {
    addressLine = props.place.formattedAddress;
  }
  return (
    <div className="place-card">
      <div className="place-card-body">
        <h4 className="place-card-title">{props.place.name}</h4>
        <Rating stars={props.place.rating} />
        <p>{addressLine}</p>
      </div>
      <div className="place-card-footer">
        <p>View Details</p>
        <FontAwesomeIcon icon={["fa", "trash-alt"]} />
      </div>
    </div>
  );
};

Place.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    priceLevel: PropTypes.number.isRequired,
    formattedAddress: PropTypes.string.isRequired
  })
};

export default Place;
