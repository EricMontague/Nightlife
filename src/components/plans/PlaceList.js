import React from "react";
import Place from "./Place";
import PropTypes from "prop-types";

const PlaceList = props => {
  return (
    <div className="card-body mb-3">
      {props.places.map((place, index) => {
        return <Place key={index} place={place} />;
      })}
    </div>
  );
};

PlaceList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired))
};
export default PlaceList;
