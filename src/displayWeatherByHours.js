import { getTodayHour } from "./displayMainWeather";
import { iconsSvg } from "./utils";

export const displayWeatherByHours = (weatherObject = []) => {
  const today = weatherObject[0]?.hours || [];
  const tomorrow = weatherObject[1]?.hours || [];
  const combinedHours = today.concat(tomorrow);
  const timeZoneHour = getTodayHour(
    weatherObject[0]?.timezone || "Europe/London"
  );
  const currentFormattedHour = `${timeZoneHour}:00`;
  const indexOfCurrentHour = today.findIndex(
    (hour) => hour.datetime === currentFormattedHour
  );
  const hoursToShow = combinedHours.slice(
    indexOfCurrentHour + 1,
    indexOfCurrentHour + 8 // 7 hours that we show, 1 more because of slice
  );

  const displayHours = (hours) => {
    const hoursWeatherElems = document.querySelectorAll(".hours-weather");
    hours.forEach((hour, idx) => {
      const { datetime, temp, precipProb, icon } = hour;
      const hourWeatherElem = hoursWeatherElems[idx];
      const hourElem = hourWeatherElem.querySelector(".hour");
      hourElem.textContent = datetime.substring(0, hour.datetime.length - 6);
      const hourTempElem = hourWeatherElem.querySelector(".hour-temp");
      hourTempElem.textContent = `${Math.round(temp)}ºC`;

      const hourPrecipElem = hourWeatherElem.querySelector(".hour-precip>p");
      hourPrecipElem.textContent = `${Math.round(precipProb)}%`;

      const iconHourElem = hourWeatherElem.querySelector(".icon-div");
      iconHourElem.innerHTML = iconsSvg[icon];
    });
  };

  displayHours(hoursToShow);
};
