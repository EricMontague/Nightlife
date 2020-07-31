import React from "react";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Place = props => {
  return (
    <div className="place-card">
      <div className="place-card-body">
        <h4 class="place-card-title">{props.place.name}</h4>
        <Rating stars={props.place.rating} />
        <p>
          {props.place.priciness} | {props.place.address}
        </p>
      </div>
      <div className="place-card-footer">
        <p>View Details</p>
        <FontAwesomeIcon icon={["fa", "trash-alt"]} />
      </div>
    </div>
  );
};

export default Place;
