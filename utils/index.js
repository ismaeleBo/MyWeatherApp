export const getMonthName = date => {
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

export const getDayName = dayNumber => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return days[dayNumber];
};

export const getFullDay = date => {
  const day = date.getDay();
  const dayName = getDayName(day);

  return `${dayName} ${day},`;
};

export const getFullHour = date => {
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