import React from "react";
import PropTypes from "prop-types";

const DatePicker = props => {
  return (
    <div className="input-group">
      <input
        type="date"
        autoFocus={props.autoFocus}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        className={props.error ? "input-with-error" : ""}
        aria-label={props.name}
      />
      <small className="error-message">{props.error ? props.error : ""}</small>
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default DatePicker;
