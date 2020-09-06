const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Noc",
  "Dec"
];

const formatTime = (hours, minutes) => {
  const period = hours < 12 ? "AM" : "PM";
  let formattedHours = hours;
  if (hours === 0) {
    formattedHours = 12;
  } else if (hours > 12) {
    formattedHours = hours - 12;
  }
  return formattedHours.toString() + ":" + minutes.toString() + " " + period;
};

// returns datetime in the format of Tue, July 28, 2020, expects a date object
export const convertDatetimeToString = date => {
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const formattedTime = formatTime(date.getHours(), date.getMinutes());
  return (
    dayName +
    ", " +
    monthName +
    " " +
    date.getDate().toString() +
    ", " +
    formattedTime
  );
};

// Expects a date obbject. Returns date in the format 07/28/2020
export const formatDate = date => {
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month.toString();
  } else {
    month = month.toString();
  }
  let dateNumber = date.getDate();
  if (dateNumber < 10) {
    dateNumber = "0" + dateNumber.toString();
  } else {
    dateNumber = dateNumber.toString();
  }
  return year + "-" + month + "-" + dateNumber;
};

// Expects date and time to be strings
export const convertToDatetime = (date, time) => {
  return new Date(`${date} ${time}`);
};
