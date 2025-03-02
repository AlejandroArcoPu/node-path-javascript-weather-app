import DayWeather from "./DayWeather";
import HourWeather from "./HourWeather";

const fetchWeather = async (place) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/weather/${place}`);
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
