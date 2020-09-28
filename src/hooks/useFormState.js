import { useState } from "react";

const useFormState = ({ initialValues, onSubmit, fieldValidators }) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState(() => {
    const errors = {};
    for (const field in initialValues) {
      errors[[field]] = "";
    }
    return errors;
  });

  const handleChange = event => {
    const newValues = Object.assign({}, values, {
      [event.target.name]: event.target.value
    });
    setValues(newValues);
  };

  const handleBlur = event => {
    const inputName = event.target.name;
    if (errors[inputName]) {
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
  };

  const handleFocus = event => {
    const inputName = event.target.name;
    if (errors[inputName]) {
      event.target.classList.add("input-with-error");
      event.target.nextElementSibling.classList.add("label-with-error");
    } else {
      event.target.classList.add("input-without-error");
      event.target.nextElementSibling.classList.add("label-without-error");
    }
    event.target.nextElementSibling.classList.add("label-selected");
  };

  const validateOnSubmit = () => {
    const errors = {};
    let hasError = false;
    for (const field in values) {
      const validators = fieldValidators[field];
      const value = values[field];
      for (let index = 0; index < validators.length; index++) {
        let message = "";
        if (field === "time") {
          message = validators[index](values["date"], values["time"]);
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
    setErrors(errors);
    return hasError;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const hasError = validateOnSubmit();
    if (!hasError) {
      onSubmit({ ...values });
    }
  };
  return [
    values,
    errors,
    setValues,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit
  ];
};

export default useFormState;
