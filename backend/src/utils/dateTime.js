export const getDateTimeZone = (timezone, offset = 0) => {
  let dt = new Date();
  dt.setDate(dt.getDate() + offset);
  const today = dt.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone,
  });
  return today;
};
