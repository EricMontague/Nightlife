import React from "react";
import InputGroup from "../common/InputGroup";
import { Link } from "react-router-dom";
import {
  required,
  validateLength,
  validateEmail
} from "../../services/validators";
import PropTypes from "prop-types";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: { email: "", password: "" },
      errors: { email: "", password: "" }
    };
    this.validators = {
      email: [required, validateLength(1, 64), validateEmail],
      password: [required, validateLength(8, 32)]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.clear = this.clear.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateOnSubmit();
    if (this.isValid()) {
      console.log("Valid submission");
      this.props.signInWithEmailAndPassword({ ...this.state.fields });
      this.clear();
    }
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [event.target.name]: event.target.value
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

  validateOnSubmit() {
    const errors = {};
    for (const field in this.state.fields) {
      const validators = this.validators[field];
      const value = this.state.fields[field];
      for (let index = 0; index < validators.length; index++) {
        const message = validators[index](value);
        if (message !== "") {
          errors[[field]] = message;
          break;
        }
      }
    }
    this.setState({ errors });
  }

  render() {
    return (
      <>
        <header className="card-header">
          <h3 className="card-title">Sign In</h3>
        </header>
        <form onSubmit={this.handleSubmit}>
          <InputGroup
            type="text"
            inputName="email"
            labelName="Email Address"
            autoFocus={true}
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
            Sign In
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
            Don't have an account? <Link to="/signup"> Sign up here.</Link>
          </p>
        </div>
      </>
    );
  }
}

SignInForm.propTypes = {
  signInWithEmailAndPassword: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
};

export default SignInForm;
