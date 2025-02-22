import DayWeather from "./DayWeather";
import HourWeather from "./HourWeather";

const fetchTimeZone = async (place) => {
  const responseWeather = await fetch(
    `https://pericolospalotes12345.com/VisualCrossingWebServices/rest/services/timeline/${place}/2020-10-01?key=${process.env.VISUAL_CROSSING_API_KEY}&unitGroup=uk&timezone`
  );
  if (!responseWeather.ok) {
    throw new Error("HTTP visual crossing error!");
  }
  const { timezone } = await responseWeather.json();
  return timezone;
};

const getDateTimeZone = (timezone, offset = 0) => {
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

const fetchWeather = async (place) => {
  try {
    const placeTimezone = await fetchTimeZone(place);
    const response = await fetch(
      `https://pericolospalotes12345.com/VisualCrossingWebServices/rest/services/timeline/${place}/${getDateTimeZone(
        placeTimezone
      )}/${getDateTimeZone(placeTimezone, 4)}/?key=${
        process.env.VISUAL_CROSSING_API_KEY
      }&unitGroup=uk`
    );
    if (!response.ok) {
      throw new Error("HTTP visual crossing error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherObject = async (place) => {
  const weather = await fetchWeather(place);
  const daysWeather = weather.days.map((day) => {
    const dayObject = new DayWeather(
      day.datetime,
      day.icon,
      day.tempmax,
      day.tempmin,
      day.precipprob,
      day.conditions,
      day.description,
      day.hours.map((hour) => {
        const hourObject = new HourWeather(
          hour.datetime,
          hour.temp,
          hour.precip,
          hour.humidity,
          hour.windspeed,
          hour.uvindex,
          hour.pressure,
          hour.precipprob,
          hour.icon,
          hour.conditions,
          hour.feelslike
        );
        return hourObject;
      }),
      day.moonphase,
      weather.timezone
    );
    return dayObject;
  });
  return daysWeather;
};
