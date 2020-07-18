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
      errors: { firstName: "", lastName: "", email: "", password: "" }
    };
    this.validators = {
      firstName: [required, validateLength(8, 32)],
      lastname: [required, validateLength(8, 32)],
      email: [required, validateLength(1, 64), validateEmail],
      password: [required, validateLength(8, 32)]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.clear = this.clear.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.createUserWithEmailAndPassword({ ...this.state.fields });
      this.clear();
    }
  }

  handleChange(event) {
    const error = this.validate(event.target.name, event.target.value);
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [event.target.name]: event.target.value
      }),
      errors: Object.assign({}, this.state.errors, {
        [event.target.name]: error
      })
    });
  }

  handleBlur(event) {
    if (event.target.value !== "") {
      event.target.nextElementSibling.classList.add("label-raised");
    } else {
      event.target.nextElementSibling.classList.remove("label-raised");
    }
  }

  clear() {
    this.setState({ fields: {}, errors: {} });
  }

  isValid() {
    for (const error in this.state.errors) {
      if (error !== "") {
        return false;
      }
    }
    return true;
  }

  validate(inputName, value) {
    let error = "";
    const validators = this.validators[inputName];
    for (let index = 0; index < validators.length; index++) {
      const message = validators[index](value);
      if (message !== "") {
        error = message;
        break;
      }
    }
    return error;
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
