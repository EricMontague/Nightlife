import React from "react";
import InputGroup from "../common/InputGroup";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: { email: "", password: "" },
      errors: { email: "", password: "" }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.clear = this.clear.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);
    this.renderInputGroups = this.renderInputGroups.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.signInWithEmailAndPassword({ ...this.state.fields });
      this.clear();
    }
  }

  handleChange(event) {
    const error = this.validate(event.target.value);
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

  validate(value) {
    let error = "";
    const validators = this.props.validators;
    for (let index = 0; index < validators.length; index++) {
      const message = validators[index](value);
      if (message !== "") {
        error = message;
        break;
      }
    }
    return error;
  }

  renderInputGroups() {
    const inputProps = [
      { type: "text", inputName: "email", labeName: "Email address" },
      { type: "password", inputName: "password", labeName: "password" }
    ];
    let inputs = [];
    inputProps.forEach(inputProp => {
      inputs.append(
        <InputGroup
          type={inputProp.type}
          inputName={inputProp.inputName}
          labelName={inputProp.labelName}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          value={this.state.fields[inputProp.inputName]}
          error={this.state.errors[inputProp.inputName]}
        />
      );
    });
    return inputs;
  }

  render() {
    return (
      <>
        <header className="auth-card-header">
          <h3 className="auth-card-title">Sign In</h3>
        </header>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputGroups()}
          {/* <InputGroup
            type="text"
            inputName="email"
            labelName="Email Address"
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            value={this.state.fields["email"]}
            error={this.state.errors["email"]}
          />
          
          <InputGroup
            type="password"
            inputName="password"
            labelName="Password"
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            value={this.state.fields["password"]}
            error={this.state.errors["password"]}
          />
           */}
          <button type="submit">Sign In</button>
        </form>
        <button
          type="button"
          onClick={() => this.props.signInWithGoogle()}
          className="btn btn-secondary btn-shadow btn-block"
        >
          Sign in with Google
        </button>
        <footer>
          Don't have an account?
          <Link to="/signup">
            {" "}
            <strong>Sign up here</strong>
          </Link>
        </footer>
      </>
    );
  }
}

SignInForm.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func.isRequired),
  signInWithEmailAndPassword: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
};

export default SignInForm;
