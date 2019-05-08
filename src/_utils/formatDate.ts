/**
 * Returns the date in the format of the time zone the user is in
 * For example
 *  UK: DD/MM/YY
 *  US: MM/DD/YY
 * @param { string } date - the date
 */
export const formatDate = (date: Date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
};
