import React from "react";
import PropTypes from "prop-types";

const DatePicker = props => {
  return (
    <div className="input-group">
      <input
        type="date"
        autoFocus={props.autoFocus}
        name={props.inputName}
        placeholder={props.placeholder}
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

DatePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default DatePicker;
