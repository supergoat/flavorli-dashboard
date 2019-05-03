const sortMonths = (days: any) => {
  const months: string[] = [
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

  return months.filter(function(d) {
    return days.indexOf(d) >= 0;
  });
};

export default sortMonths;
