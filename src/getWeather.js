import DayWeather from "./DayWeather";
import HourWeather from "./HourWeather";

const gateTodayDate = () => {
  let dt = new Date();
  const today = dt.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return today;
};

const get5DaysMoreDate = () => {
  let dt = new Date();
  dt.setDate(dt.getDate() + 4);
  const fiveMoreDays = dt.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fiveMoreDays;
};

const fetchWeather = async (place) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/${gateTodayDate()}/${get5DaysMoreDate()}/?key=${
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
          hour.icon
        );
        return hourObject;
      }),
      day.moonphase
    );
    return dayObject;
  });
  return daysWeather;
};
