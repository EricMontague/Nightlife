import React, { useEffect } from "react";
import PropTypes from "prop-types";

const InputGroup = props => {
  const inputRef = React.createRef();

  // Workaround to deal with issue of the label not staying up after a form is submitted
  // And this field has an error
  // Also addresses the issue of having the label be moved up when the input is prefilled
  useEffect(() => {
    if (inputRef.current === document.activeElement || inputRef.current.value) {
      inputRef.current.nextElementSibling.classList.add("label-selected");
    }
  });

  return (
    <div className="input-group">
      <input
        ref={inputRef}
        autoFocus={props.autoFocus}
        type={props.type}
        id={props.inputName}
        name={props.inputName}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        onFocus={props.handleFocus}
        value={props.value}
        className={props.error ? "input-with-error" : ""}
      />
      <label
        htmlFor={props.inputName}
        className={props.error ? "label-with-error" : ""}
      >
        {props.labelName}
      </label>
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
  error: PropTypes.string
};

export default InputGroup;
