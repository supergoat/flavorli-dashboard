const sortDays = (days: any) => {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return daysOfWeek.filter(function(d) {
    return days.indexOf(d) >= 0;
  });
};

export default sortDays;
