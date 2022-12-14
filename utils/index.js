export const getMonthName = (date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthNumber = date.getMonth();

  return months[monthNumber];
};

export const getDayName = (dayNumber) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[dayNumber];
};

export const getFullDay = (date) => {
  const day = date.getDate();
  const dayName = getDayName(date.getDay());

  return `${dayName} ${day},`;
};

export const getFullHour = (date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  let fullHour = hour;
  let fullMinutes = minutes;

  if (minutes < 10) {
    fullMinutes = `0${minutes}`;
  }

  if (hour < 10) {
    fullHour = `0${hour}`;
  }

  return `${fullHour}:${fullMinutes}`;
};

export const getTimeByTimezone = (timezone) => {
  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  const remoteTime = utc + 1000 * timezone;

  return new Date(remoteTime);
};

export const capitalize = (s) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
