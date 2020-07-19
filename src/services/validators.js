export const required = value => {
  let message = "";
  if (!value) {
    message = "Please fill out required field";
  }
  return message;
};

export const validateLength = (min, max) => {
  const validate = value => {
    let message = "";
    if (value.length < min || value.length > max) {
      message = `Length of input must be in between ${min} and ${max} characters`;
    }
    return message;
  };
  return validate;
};

// very simple email regex. Not meant to be exhaustive
export const validateEmail = value => {
  let message = "";
  const regex = /^([a-zA-z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
  if (!regex.test(value)) {
    message = "Please provide a valid email address";
  }
  return message;
};
