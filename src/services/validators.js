export const required = value => {
  let message = "";
  if (!value) {
    message = "Please fill out required field";
  }
  return message;
};

export const validateLength = (min, max, value) => {
  let message = "";
  if (value.length < min || value.length > max) {
    message = `Length of input must be in between ${min} and ${max} characters`;
  }
  return message;
};

export const validateEmail = value => {
  let message = "";
  return message;
};
