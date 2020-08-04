import React from "react";
import Autocomplete from "react-google-autocomplete";
import PropTypes from "prop-types";

const AutocompleteInputGroup = props => {
  return (
    <div className="input-group">
      <Autocomplete
        apiKey={process.env.REACT_APP_GCP_API_KEY}
        className={props.autocompleteClassName}
        onPlaceSelected={props.handlePlaceSelected}
        types={props.types}
        fields={props.fields}
        autoFocus={props.autoFocus}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        placeholder=""
        name={props.inputName}
        id={props.inputName}
      />
      <label htmlFor={props.inputName}>{props.labelName}</label>
    </div>
  );
};

AutocompleteInputGroup.propTypes = {
  autocompleteClassName: PropTypes.string.isRequired,
  handlePlaceSelected: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(PropTypes.string.isRequired),
  fields: PropTypes.arrayOf(PropTypes.string.isRequired),
  autoFocus: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired
};

export default AutocompleteInputGroup;
