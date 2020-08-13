import React from "react";
import InputGroup from "../common/InputGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import DatePicker from "../common/DatePicker";
import TimePicker from "../common/TimePicker";
import {
  required,
  validateLength,
  validateDateRange,
  validateDateTime
} from "../../services/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

class PlanDetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: this.props.plan.title,
        description: this.props.plan.description,
        date: this.props.plan.date,
        time: this.props.plan.time
      },
      errors: { title: "", description: "", date: "", time: "" },
      hasError: false
    };
    this.validators = {
      title: [required, validateLength(1, 100)],
      description: [required, validateLength(1, 140)],
      date: [required, validateDateRange(new Date().toLocaleDateString(), "")],
      time: [required, validateDateTime]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.clear = this.clear.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.plan !== this.props.plan) {
      console.log("Calling componentDidUpdate");
      console.log(this.props.plan);
      this.setState({
        fields: {
          title: this.props.plan.title,
          description: this.props.plan.description,
          date: this.props.plan.date,
          time: this.props.plan.time
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateOnSubmit().then(() => {
      if (!this.state.hasError) {
        const plan = { ...this.state.fields };
        this.props.setPlanDetails(plan);
        this.props.toggleView();
      }
    });
  }

  handleChange(event) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [event.target.name]: event.target.value.trim()
      })
    });
  }

  handleBlur(event) {
    const inputName = event.target.name;
    if (this.state.errors[inputName]) {
      if (event.target.value) {
        event.target.classList.add("input-with-error");
        event.target.nextElementSibling.classList.add(
          "label-with-error",
          "label-selected"
        );
      } else {
        event.target.nextElementSibling.classList.remove("label-selected");
      }
    } else {
      // No error
      if (event.target.value) {
        event.target.classList.remove("input-without-error");
        event.target.nextElementSibling.classList.remove("label-without-error");
      } else {
        event.target.classList.remove("input-without-error");
        event.target.nextElementSibling.classList.remove(
          "label-without-error",
          "label-selected"
        );
      }
    }
  }

  handleFocus(event) {
    const inputName = event.target.name;
    if (this.state.errors[inputName]) {
      event.target.classList.add("input-with-error");
      event.target.nextElementSibling.classList.add("label-with-error");
    } else {
      event.target.classList.add("input-without-error");
      event.target.nextElementSibling.classList.add("label-without-error");
    }
    event.target.nextElementSibling.classList.add("label-selected");
  }

  clear() {
    this.setState({
      fields: { title: "", description: "" },
      errors: { title: "", description: "" },
      hasError: false
    });
  }

  async validateOnSubmit() {
    const errors = {};
    let hasError = false;
    for (const field in this.state.fields) {
      const validators = this.validators[field];
      const value = this.state.fields[field];
      for (let index = 0; index < validators.length; index++) {
        let message = "";
        if (field === "time") {
          message = validators[index](
            this.state.fields["date"],
            this.state.fields["time"]
          );
        } else {
          message = validators[index](value);
        }

        errors[[field]] = message;
        if (message !== "") {
          hasError = true;
          break;
        }
      }
    }
    this.setState({ errors, hasError });
  }

  render() {
    return (
      <div className="card">
        <h3 className="card-title mb-2">Plan Details</h3>
        <p className="mb-3 text-medium">
          Enter some details about your night out
        </p>
        <form onSubmit={this.handleSubmit}>
          <DatePicker
            inputName="date"
            labelName="Date"
            placeholder="mm/dd/yyyy"
            autoFocus={true}
            value={this.state.fields["date"]}
            error={this.state.errors["date"]}
            handleChange={this.handleChange}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
          />
          <TimePicker
            inputName="time"
            labelName="Time"
            autoFocus={false}
            value={this.state.fields["time"]}
            error={this.state.errors["time"]}
            handleChange={this.handleChange}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
          />
          <InputGroup
            type="text"
            inputName="title"
            labelName="Title"
            autoFocus={false}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["title"]}
            error={this.state.errors["title"]}
          />
          <TextAreaGroup
            name="description"
            labelName="Description"
            autoFocus={false}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["description"]}
            error={this.state.errors["description"]}
            rows={60}
            cols={8}
          />
          <button
            type="submit"
            className="btn btn-primary forward-btn float-right"
          >
            Next
            <FontAwesomeIcon icon={["fa", "chevron-right"]} />
          </button>
        </form>
      </div>
    );
  }
}

PlanDetailsForm.propTypes = {
  toggleView: PropTypes.func.isRequired,
  setPlanDetails: PropTypes.func.isRequired,
  plan: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default PlanDetailsForm;
