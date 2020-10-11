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
  const emailRegexp = /^([a-zA-z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
  if (!emailRegexp.test(value)) {
    message = "Please provide a valid email address";
  }
  return message;
};

// expects input to be string
export const validateDateFormat = (dateRegexp, format) => {
  const validate = dateInput => {
    let message = "";
    if (!dateRegexp.test(dateInput)) {
      message = `Date format should be ${format}`;
    }
    return message;
  };

  return validate;
};

// expects input to be string
export const validateDateRange = (min, max) => {
  const validate = dateInput => {
    let message = "";
    const date = new Date(dateInput + "T00:00:00");
    const minDate = new Date(min + "T00:00:00");
    const maxDate = new Date(max + "T00:00:00");
    if (min && max) {
      if (date < minDate || date > maxDate) {
        message = `Date must be between ${min} and ${max}`;
      }
    } else if (min && !max) {
      if (date < minDate) {
        message = `Date cannot be before ${min}`;
      }
    } else if (!min && max) {
      if (date > maxDate) {
        message = `Date cannot be after ${max}`;
      }
    }
    return message;
  };
  return validate;
};

// expects two date objects
const isSameDay = (dateOne, dateTwo) => {
  return dateOne.toLocaleDateString() === dateTwo.toLocaleDateString();
};

// expects two dateobjects
const isBeforeTime = (originalDate, comparisonDate) => {
  const [originalHours, originalMinutes] = originalDate
    .toTimeString()
    .split(":");
  const [
    comparisonHours,
    comparisonMinutes
  ] = comparisonDate.toTimeString().split(":");
  if (
    parseInt(comparisonHours) < parseInt(originalHours) ||
    (comparisonHours === originalHours &&
      parseInt(comparisonMinutes) < parseInt(originalMinutes))
  ) {
    return true;
  }
  return false;
};

// expects two date obects
const isBeforeDate = (originalDate, comparisonDate) => {
  return comparisonDate.getDate() < originalDate.getDate();
};

// expects input to be string
export const validateDateTime = (dateString, timeString) => {
  let message = "";
  const now = new Date();
  const dateTime = new Date(`${dateString} ${timeString}`);
  if (
    isSameDay(dateTime, now) &&
    (isBeforeTime(now, dateTime) || isBeforeDate(now, dateTime))
  ) {
    message = "Time cannot be in the past";
  }
  return message;
};
