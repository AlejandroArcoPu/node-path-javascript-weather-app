import { iconsHourSvg } from "./utils";

export const getTodayHour = (timezone) => {
  let dt = new Date();
  let todayHour = dt.toLocaleTimeString("en-GB", {
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
  const displaySearchedPlace = () => {
    const searchedPlace = document.querySelector(".searched-place");
    searchedPlace.textContent = weatherObject[0].address.split(",")[0];
  };
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
    const condition = currentHourWeather.conditions;
    const iconConditionsElem = document.querySelector(".icon-conditions");
    iconConditionsElem.innerHTML = iconsHourSvg[icon];
    const svgCondition = iconConditionsElem.querySelector("svg");
    svgCondition.classList.remove("icon-hour");
    svgCondition.classList.add("icon");

    const conditionElem = document.querySelector(".condition");
    conditionElem.textContent = condition;
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
  displaySearchedPlace();
};
