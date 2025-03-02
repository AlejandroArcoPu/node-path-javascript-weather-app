export const fetchTimeZone = async (place) => {
  const responseWeather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/2025-01-01?key=${process.env.VISUAL_CROSSING_API_KEY}&unitGroup=uk&timezone`
  );
  if (!responseWeather.ok) {
    throw new Error("HTTP visual crossing error!");
  }
  const { timezone } = await responseWeather.json();
  return timezone;
};
