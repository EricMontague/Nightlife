import React from "react";
import InputGroup from "../common/InputGroup";
import { Link } from "react-router-dom";
import {
  required,
  validateLength,
  validateEmail
} from "../../services/validators";
import PropTypes from "prop-types";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: { firstName: "", lastName: "", email: "", password: "" },
      errors: { firstName: "", lastName: "", email: "", password: "" },
      hasError: false
    };
    this.validators = {
      firstName: [required, validateLength(1, 32)],
      lastName: [required, validateLength(1, 32)],
      email: [required, validateLength(1, 64), validateEmail],
      password: [required, validateLength(8, 32)]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.clear = this.clear.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateOnSubmit().then(() => {
      if (!this.state.hasError) {
        console.log("Valid submission");
        this.props.createUserWithEmailAndPassword(
          this.state.fields["email"],
          this.state.fields["password"]
        );
        this.clear();
      }
    });
  }

  handleChange(event) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [event.target.name]: event.target.value
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
      console.log("With error");
      event.target.classList.add("input-with-error");
      event.target.nextElementSibling.classList.add("label-with-error");
    } else {
      event.target.classList.add("input-without-error");
      event.target.nextElementSibling.classList.add("label-without-error");
    }
    event.target.nextElementSibling.classList.add("label-selected");
  }

  clear() {
    this.setState({ fields: {}, errors: {} });
  }

  isValid() {
    for (const inputName in this.state.errors) {
      if (this.state.errors[inputName] !== "") {
        return false;
      }
    }
    return true;
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
      <>
        <header className="card-header">
          <h3 className="card-title">Sign Up</h3>
        </header>
        <form onSubmit={this.handleSubmit}>
          <InputGroup
            type="text"
            inputName="firstName"
            labelName="First Name"
            autoFocus={true}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["firstName"]}
            error={this.state.errors["firstName"]}
          />

          <InputGroup
            type="text"
            inputName="lastName"
            labelName="Last Name"
            autoFocus={false}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["lastName"]}
            error={this.state.errors["lastName"]}
          />

          <InputGroup
            type="text"
            inputName="email"
            labelName="Email Address"
            autoFocus={false}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["email"]}
            error={this.state.errors["email"]}
          />

          <InputGroup
            type="password"
            inputName="password"
            labelName="Password"
            autoFocus={false}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            value={this.state.fields["password"]}
            error={this.state.errors["password"]}
          />
          <button
            type="submit"
            className="btn btn-primary btn-shadow btn-block mb-1"
          >
            Sign Up
          </button>
        </form>
        <button
          type="button"
          onClick={() => this.props.signInWithGoogle()}
          className="btn btn-secondary btn-shadow btn-block mb-1"
        >
          Sign in with Google
        </button>
        <div className="card-footer flex justify-center">
          <p>
            Already have an account? <Link to="/signin"> Log in here.</Link>
          </p>
        </div>
      </>
    );
  }
}

SignUpForm.propTypes = {
  createUserWithEmailAndPassword: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
};

export default SignUpForm;
