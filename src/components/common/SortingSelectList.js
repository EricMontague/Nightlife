import React from "react";
import PropTypes from "prop-types";

const SortingSelectList = props => {
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

  return (
    <div className="sort-results">
      <label htmlFor="sort-by">{props.label}</label>
      <span className="pipe">|</span>
      <select name="sort-by" id="sort-by" className="select-list">
        {getOptions()}
      </select>
    </div>
  );
};

SortingSelectList.propTypess = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.objectOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default SortingSelectList;
