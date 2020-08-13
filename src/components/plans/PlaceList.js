import React from "react";
import Place from "./Place";
import PropTypes from "prop-types";

const PlaceList = props => {
  return (
    <div className="card-body mb-3">
      {props.places.map((place, index) => {
        return (
          <Place
            key={index}
            place={place}
            handleDeleteClick={props.handleDeleteClick}
            isReadOnly={props.isReadOnly}
          />
        );
      })}
    </div>
  );
};

PlaceList.propTypes = {
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
  isReadOnly: PropTypes.bool.isRequired
};
export default PlaceList;
