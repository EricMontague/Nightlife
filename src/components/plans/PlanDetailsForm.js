import React from "react";
import InputGroup from "../common/InputGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import { required, validateLength } from "../../services/validators";
import PropTypes from "prop-types";

class PlanDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: { title: "", description: "" },
      errors: { title: "", description: "" },
      charactersLeft: { title: 100, description: 140 },
      hasError: false
    };
    this.validators = {
      title: [required, validateLength(1, 100)],
      description: [required, validateLength(1, 140)]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.clear = this.clear.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateOnSubmit().then(() => {
      if (!this.state.hasError) {
        this.props.toggleView();
        this.clear();
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
        const message = validators[index](value);
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
        <form onSubmit={this.handleSubmit}>
          <input type="date" name="date" placeholder="yyyy-mm-dd" />
          <InputGroup
            type="text"
            inputName="title"
            labelName="Plan title"
            autoFocus={true}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["title"]}
            error={this.state.errors["title"]}
          />
          <TextAreaGroup
            name="description"
            labelName="Plan description"
            autoFocus={false}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["description"]}
            error={this.state.errors["description"]}
            rows={6}
            cols={8}
          />
          <button type="submit" className="btn btn-primary btn-shadow">
            Next
          </button>
        </form>
      </div>
    );
  }
}

PlanDetailsForm.propTypes = {
  toggleView: PropTypes.func.isRequired
};

export default PlanDetailsForm;
