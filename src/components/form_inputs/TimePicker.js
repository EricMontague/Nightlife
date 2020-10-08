import React from "react";
import PropTypes from "prop-types";

const TimePicker = props => {
  return (
    <div className="input-group">
      <input
        type="time"
        autoFocus={props.autoFocus}
        name={props.inputName}
        value={props.value}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        className={props.error ? "input-with-error animation-shake" : ""}
        aria-label={props.name}
      />
      <label
        htmlFor={props.inputName}
        className={
          "label-selected no-transition" +
          (props.error ? " label-with-error animation-shake" : "")
        }
      >
        {props.labelName}
      </label>
      <small className="error-message">{props.error ? props.error : ""}</small>
    </div>
  );
};

TimePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default TimePicker;
