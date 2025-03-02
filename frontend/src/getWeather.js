import DayWeather from "./DayWeather";
import HourWeather from "./HourWeather";

// const fetchTimeZone = async (place) => {
//   try {
//     const responseWeather = await fetch(
//       `https://pericoafdad.com/VisualCrossingWebServices/rest/services/timeline/${place}/2024-01-01?key=${process.env.VISUAL_CROSSING_API_KEY}&unitGroup=uk&timezone`
//     );
//     if (!responseWeather.ok) {
//       throw new Error("HTTP visual crossing error!");
//     }
//     const { timezone } = await responseWeather?.json();
//     return timezone;
//   } catch (error) {
//     console.log(`Error: ${error}`);
//   }
// };

// const getDateTimeZone = (timezone, offset = 0) => {
//   let dt = new Date();
//   dt.setDate(dt.getDate() + offset);
//   const today = dt.toLocaleDateString("sv-SE", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     timeZone: timezone,
//   });
//   return today;
// };

// const fetchWeather = async (place) => {
//   try {
//     const placeTimezone = await fetchTimeZone(place);
//     const response = await fetch(
//       `https://perciodfasdfasdf.com/VisualCrossingWebServices/rest/services/timeline/${place}/${getDateTimeZone(
//         placeTimezone
//       )}/${getDateTimeZone(placeTimezone, 4)}/?key=${
//         process.env.VISUAL_CROSSING_API_KEY
//       }&unitGroup=uk`
//     );
//     console.log(response);
//     if (!response.ok) {
//       throw new Error("HTTP visual crossing error!");
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(`Error: ${error}`);
//   }
// };

const fetchWeather = async (place) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/weather/${place}`);
    if (!response.ok) {
      throw new Error("HTTP visual crossing error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getWeatherObject = async (place) => {
  const weather = await fetchWeather(place);
  const daysWeather = weather?.days?.map((day) => {
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
      weather.timezone,
      weather.resolvedAddress
    );
    return dayObject;
  });
  return daysWeather;
};
