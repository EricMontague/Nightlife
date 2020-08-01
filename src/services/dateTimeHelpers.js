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

// returns datetime in the format of Tue, July 28, 2020
export const formatDateTime = date => {
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

// returns date in the format 07/28/2020
export const formatDate = date => {
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month.toString();
  } else {
    month = month.toString();
  }
  const dateNumber = date.getDate().toString();
  return year + "-" + month + "-" + dateNumber;
};
