import React from "react";
import Rating from "./Rating";
import constants from "../../services/constants";
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
        <h4 className="place-card-title">
          {props.position + ". " + props.place.name}
        </h4>
        <Rating
          stars={
            props.place.rating === constants.DEFAULT_RATING
              ? 0
              : props.place.rating
          }
        />
        <p>{addressLine}</p>
      </div>
      <div className="place-card-footer">
        <p>View Details</p>
        {props.discoverMode !== constants.DISCOVER_MODE.VIEW && (
          <FontAwesomeIcon
            icon={["fa", "trash-alt"]}
            onClick={() => props.handleDeleteClick(props.place.placeId)}
          />
        )}
      </div>
    </div>
  );
};

Place.propTypes = {
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
  handleDeleteClick: PropTypes.func.isRequired,
  discoverMode: PropTypes.string.isRequired
};

export default React.memo(Place);
