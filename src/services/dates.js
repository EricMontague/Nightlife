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