import React from "react";
import PropTypes from "prop-types";

const TimePicker = props => {
  console.log(props.value);
  return (
    <div className="input-group">
      <input
        type="time"
        autoFocus={props.autoFocus}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className={props.error ? "input-with-error" : ""}
        aria-label={props.name}
      />
    </div>
  );
};

TimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default TimePicker;
