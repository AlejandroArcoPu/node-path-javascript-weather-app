import cloudy from "./images/cloudy.svg";
import partlyCloudDay from "./images/partly-cloudy-day.svg";
import partlyCloudNight from "./images/partly-cloudy-night.svg";
import clearNight from "./images/clear-night.svg";

const icons = {
  cloudy: cloudy,
  "partly-cloudy-day": partlyCloudDay,
  "partly-cloudy-night": partlyCloudNight,
  "clear-night": clearNight,
};

const getTodayHour = (timezone) => {
  let dt = new Date();
  let todayHour = dt.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    timeZone: timezone,
  });
  const formattedHour = `${todayHour}:00`;
  return formattedHour;
};

const getFormattedDate = (timezone) => {
  const dt = new Date();
  const options = {
    day: "numeric",
    month: "long",
    timeZone: timezone,
  };
  const formattedDate = `Today, ${dt.toLocaleDateString("en-GB", options)}`;
  return formattedDate;
};

export const displayMainWeather = (weatherObject) => {
  const todayHours = weatherObject[0].hours;
  const timeZoneHour = getTodayHour(weatherObject[0].timezone);
  const currentDate = getFormattedDate(weatherObject[0].timezone);
  const currentHourWeather = todayHours.find(
    (hour) => `${timeZoneHour}:00` === hour.datetime
  );

  const displayTemp = () => {
    const tempElem = document.querySelector(".temp");
    const degreeElem = document.createElement("span");
    degreeElem.classList = "degree";
    degreeElem.textContent = "ºC";
    tempElem.textContent = Math.round(currentHourWeather.temp);
    tempElem.append(degreeElem);
  };
  const displayConditions = () => {
    const icon = currentHourWeather.icon;
    const conditions = currentHourWeather.conditions;
    const conditionsElem = document.querySelector(".conditions");
    const iconImg = document.createElement("img");
    iconImg.classList = "icon";
    iconImg.src = icons[icon];
    conditionsElem.textContent = conditions;
    conditionsElem.prepend(iconImg);
  };
  const displayDetails = () => {
    const humidity = currentHourWeather.humidity;
    const humidityElem = document.querySelector(".humidity>.details-value");
    humidityElem.textContent = Math.round(humidity) + " %";
    const wind = currentHourWeather.wind;
    const windElem = document.querySelector(".wind>.details-value");
    windElem.textContent = wind.toFixed(1) + " mph";
    const precipitation = currentHourWeather.precipMm;
    const precipElem = document.querySelector(".precipitation>.details-value");
    precipElem.textContent = precipitation.toFixed(1) + " mm";
    const uvIndex = currentHourWeather.uvIndex;
    const uvIndexElem = document.querySelector(".uvindex>.details-value");
    uvIndexElem.textContent = uvIndex.toFixed(1);
    const pressure = currentHourWeather.pressure;
    const pressureElem = document.querySelector(".pressure>.details-value");
    pressureElem.textContent = Math.round(pressure) + " mb";
    const feelsLike = currentHourWeather.feelsLike;
    const feelsLikeElem = document.querySelector(".feelslike>.details-value");
    feelsLikeElem.textContent = Math.round(feelsLike);
    const degreeElem = document.createElement("span");
    degreeElem.classList = "degree-small";
    degreeElem.textContent = "ºC";
    feelsLikeElem.append(degreeElem);
  };
  const displayDatetime = () => {
    const dateTimeDateElem = document.querySelector(".datetime-date");
    dateTimeDateElem.textContent = currentDate;
    const dateTimeHourElem = document.querySelector(".datetime-time");
    dateTimeHourElem.textContent = timeZoneHour;
  };
  displayDatetime();
  displayTemp();
  displayConditions();
  displayDetails();
};
