import React from "react";
import PropTypes from "prop-types";

const BusinessHours = props => {
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
};

BusinessHours.propTypes = {
  businessHours: PropTypes.arrayOf(PropTypes.string.isRequired),
  isOpen: PropTypes.func.isRequired
};

export default BusinessHours;
