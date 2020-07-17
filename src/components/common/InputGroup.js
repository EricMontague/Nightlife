import React from "react";
import PropTypes from "prop-types";

const InputGroup = props => {
  return (
    <div className="input-group">
      <input
        autoFocus={props.autoFocus}
        type={props.type}
        id={props.inputName}
        name={props.inputName}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.value}
      />
      <label htmlFor={props.inputName}>{props.labelName}</label>
      <small className="error-message">{props.error ? props.error : ""}</small>
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default InputGroup;
