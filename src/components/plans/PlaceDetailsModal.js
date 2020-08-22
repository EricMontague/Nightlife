import React, { useRef } from "react";
import Rating from "./Rating";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import constants from "../../services/constants";
import BusinessHours from "./BusinessHours";
import PropTypes from "prop-types";

const PlaceDetailsModal = props => {
  const modalRef = useRef();

  let addressLine =
    "$".repeat(props.place.priceLevel) + " | " + props.place.formattedAddress;
  if (!props.place.priceLevel) {
    addressLine = props.place.formattedAddress;
  }

  const closeModal = event => {
    modalRef.current.classList.replace(
      "animation-slide-down",
      "animation-slide-up"
    );
    setTimeout(() => props.toggleModal(props.plan), 400);
  };

  useOnClickOutside(modalRef, closeModal);

  return (
    <div className="modal overflow-auto">
      <div className="modal-container-centered">
        <div
          className="modal-content modal-content-md animation-slide-down"
          ref={modalRef}
        >
          <div className="modal-header">
            <div className="modal-image mb-2">
              <img
                src={props.place.photos[0].getUrl()}
                alt={props.place.name}
              />
            </div>
            <h3 className="modal-title">{props.place.name}</h3>
            <p>{addressLine}</p>
            <Rating
              stars={
                props.place.rating === constants.DEFAULT_RATING
                  ? 0
                  : props.place.rating
              }
              starSize={"lg"}
            />
            <a
              href={props.place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-1"
            >
              Visit Website
            </a>
          </div>
          <div className="modal-body">
            <BusinessHours
              businessHours={props.place.openingHours.weekday_text}
            />
          </div>
          <div className="modal-footer">
            <div className="modal-footer-left">
              <button
                type="button"
                className="btn btn-light btn-shadow"
                // Need to look into react-transition-group instead of this hack
                onClick={closeModal}
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

PlaceDetailsModal.propTypes = {
  place: PropTypes.shape({
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
  }),
  toggleModal: PropTypes.func.isRequired
};

export default PlaceDetailsModal;
