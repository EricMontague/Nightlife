import React from "react";
import PropTypes from "prop-types";

class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };

    this.getOptions = this.getOptions.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
  }

  getOptions() {
    const options = [];
    if (this.props.defaultValue) {
      options.push(
        <option value={this.props.defaultValue.value} key={0}>
          {this.props.defaultValue.text}
        </option>
      );
    }
    // starts at 1 because the default option's key starts at 0
    for (let index = 1; index < this.props.values.length + 1; index++) {
      options.push(
        <option key={index} value={this.props.values[index - 1]}>
          {this.props.values[index - 1]}
        </option>
      );
    }
    return options;
  }

  setSelectedOption(event) {
    this.props.handleChange(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const options = this.getOptions();
    if (!this.props.isVertical) {
      return (
        <div className={"flex-row align-center " + this.props.extraClasses}>
          <label htmlFor={this.props.inputName}>{this.props.label}</label>
          <span className="pipe">|</span>
          <select
            name={this.props.inputName}
            id={this.props.inputname}
            onChange={this.setSelectedOption}
            value={this.state.value}
            className="select-list"
          >
            {options}
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor={this.props.inputName}>{this.props.label}</label>
          <select
            name={this.props.inputName}
            id={this.props.inputname}
            onChange={this.handleChange}
            value={this.state.value}
            className="select-list"
          >
            {options}
          </select>
        </div>
      );
    }
  }
}

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
