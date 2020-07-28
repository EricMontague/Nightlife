import React from "react";
import PropTypes from "prop-types";

const TextAreaGroup = props => {
  return (
    <div className="input-group">
      <textarea
        autoFocus={props.autoFocus}
        type={props.type}
        id={props.name}
        name={props.name}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        onFocus={props.handleFocus}
        className={props.error ? "input-with-error" : ""}
        row={props.rows}
        cols={props.cols}
        value={props.value}
      />
      <label
        htmlFor={props.name}
        className={props.error ? "label-with-error" : ""}
      >
        {props.labelName}
      </label>
      <small className="error-message">{props.error ? props.error : ""}</small>
    </div>
  );
};

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired
};

export default TextAreaGroup;
