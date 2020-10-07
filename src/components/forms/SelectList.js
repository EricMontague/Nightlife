import React, { useState } from "react";
import PropTypes from "prop-types";

const SelectList = props => {
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);

  const getOptions = () => {
    const options = [];
    if (props.defaultValue) {
      options.push(
        <option value={props.defaultValue.value} key={0}>
          {props.defaultValue.text}
        </option>
      );
    }
    // starts at 1 because the default option's key starts at 0
    for (let index = 1; index < props.values.length + 1; index++) {
      options.push(
        <option key={index} value={props.values[index - 1]}>
          {props.values[index - 1]}
        </option>
      );
    }
    return options;
  };

  const setSelectedOption = event => {
    props.handleChange(event.target.value);
    setSelectedValue(event.target.value);
  };

  const options = getOptions();
  if (!props.isVertical) {
    return (
      <div className={"flex-row align-center " + props.extraClasses}>
        <label htmlFor={props.inputName}>{props.labelName}</label>
        <div className="pipe">|</div>
        <select
          name={props.inputName}
          id={props.inputname}
          onChange={setSelectedOption}
          value={selectedValue}
          className="select-list"
        >
          {options}
        </select>
      </div>
    );
  } else {
    return (
      <div>
        <label htmlFor={props.inputName}>{props.labelName}</label>
        <select
          name={props.inputName}
          id={props.inputname}
          onChange={setSelectedOption}
          value={selectedValue}
          className="select-list"
        >
          {options}
        </select>
      </div>
    );
  }
};

SelectList.propTypess = {
  labelName: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  isVertical: PropTypes.bool.isRequired,
  defaultValue: PropTypes.objectOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string.isRequired),
  extraClasses: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default SelectList;
