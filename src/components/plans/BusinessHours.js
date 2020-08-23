import React from "react";
import PropTypes from "prop-types";

const BusinessHours = props => {
  if (props.businessHours.length > 0) {
    return (
      <div className="place-business-hours">
        <h3>Business Hours:</h3>
        <ul>
          {props.businessHours.map((hours, index) => {
            return <li key={index}>{hours}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

BusinessHours.propTypes = {
  businessHours: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default BusinessHours;
