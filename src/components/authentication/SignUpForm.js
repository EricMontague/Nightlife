import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputGroup from "../forms/InputGroup";
import useFormState from "../../hooks/useFormState";
import {
  required,
  validateLength,
  validateEmail
} from "../../utils/formValidators";

const SignUpForm = props => {
  // Declare variables
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const fieldValidators = {
    firstName: [required, validateLength(1, 32)],
    lastName: [required, validateLength(1, 32)],
    email: [required, validateLength(1, 64), validateEmail],
    password: [required, validateLength(8, 32)]
  };

  // Declare hooks
  const [
    fields,
    errors,
    setValues,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit
  ] = useFormState({
    initialValues,
    onSubmit: props.createUserWithEmailAndPasswordHandler,
    fieldValidators
  });

  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Sign Up</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type="text"
          inputName="firstName"
          labelName="First Name"
          autoFocus={true}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          value={fields["firstName"]}
          error={errors["firstName"]}
        />

        <InputGroup
          type="text"
          inputName="lastName"
          labelName="Last Name"
          autoFocus={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          value={fields["lastName"]}
          error={errors["lastName"]}
        />

        <InputGroup
          type="text"
          inputName="email"
          labelName="Email Address"
          autoFocus={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          value={fields["email"]}
          error={errors["email"]}
        />

        <InputGroup
          type="password"
          inputName="password"
          labelName="Password"
          autoFocus={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          value={fields["password"]}
          error={errors["password"]}
        />
        <button type="submit" className="btn btn-primary btn-block mb-1 py-2">
          Sign Up
        </button>
      </form>
      <button
        type="button"
        onClick={props.signInWithGoogle}
        className="btn btn-secondary btn-block mb-1 py-2"
      >
        Sign up with Google
      </button>
      <div className="card-footer flex justify-center">
        <p>
          Already have an account? <Link to="/signin"> Log in here.</Link>
        </p>
      </div>
    </>
  );
};

SignUpForm.propTypes = {
  createUserWithEmailAndPasswordHandler: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
};

export default SignUpForm;
