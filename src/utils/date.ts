export const dateToLocalISOMidnight = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const localDate = new Date(year, month - 1, day);
  return localDate.toISOString();
};
