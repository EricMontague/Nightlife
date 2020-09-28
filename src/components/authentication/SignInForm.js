import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InputGroup from "../forms/InputGroup";
import useFormState from "../../hooks/useFormState";
import {
  required,
  validateLength,
  validateEmail
} from "../../utils/formValidators";

const SignInForm = props => {
  // Declare variables
  const fieldValidators = {
    email: [required, validateLength(1, 64), validateEmail],
    password: [required, validateLength(8, 32)]
  };
  const initialValues = { email: "", password: "" };

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
    onSubmit: props.signInWithEmailAndPassword,
    fieldValidators
  });

  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Sign In</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type="text"
          inputName="email"
          labelName="Email Address"
          autoFocus={true}
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
          Sign In
        </button>
      </form>
      <button
        type="button"
        onClick={props.signInWithGoogle}
        className="btn btn-secondary btn-block mb-1 py-2"
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
};

SignInForm.propTypes = {
  signInWithEmailAndPassword: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
};

export default SignInForm;
