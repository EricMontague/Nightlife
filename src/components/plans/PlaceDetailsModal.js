import React from "react";
import Rating from "./Rating";
import constants from "../../services/constants";
import PropTypes from "prop-types";

const PlaceDetailsModal = props => {
  let addressLine =
    "$".repeat(props.place.priceLevel) + " | " + props.place.formattedAddress;
  return (
    <div className="modal">
      <div className="modal-container-centered">
        <div className="modal-content modal-content-md animation-slide-down">
          <div className="modal-header">
            <div className="modal-image">
              <img src={props.place.photos[0].getUrl()} alt={props.plan.name} />
            </div>
            <img src={props.place.icon} alt="" />
            <h3 className="modal-title">{props.place.name}</h3>
            <p className="py-1">{addressLine}</p>
            <Rating
              stars={
                props.place.rating === constants.DEFAULT_RATING
                  ? 0
                  : props.place.rating
              }
            />
          </div>
          <div className="modal-body">
            <p>Open Now: {props.place.openingHours.isOpen()}</p>
            <p>Business Hours:</p>
            <p>{props.place.openingHours.weekday_text}</p>
            <a href={props.place.website} target="_blank" className="link">
              Visit Website
            </a>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-left">
              <button
                type="button"
                className="btn btn-light btn-shadow"
                // Need to look into react-transition-group instead of this hack
                onClick={event => {
                  event.target.parentElement.parentElement.classList.replace(
                    "animation-slide-down",
                    "animation-slide-up"
                  );
                  setTimeout(() => props.toggleModal(props.plan), 400);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsModal;
