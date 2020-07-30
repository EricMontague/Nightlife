import React from "react";
import PropTypes from "prop-types";

const DatePicker = props => {
  console.log(props.value);
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
