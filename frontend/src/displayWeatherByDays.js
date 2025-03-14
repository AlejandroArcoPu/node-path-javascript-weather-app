import { iconsDaySvg } from "./utils";

const getDateShort = (datetime) => {
  const dt = new Date(datetime);
  const options = {
    day: "numeric",
    month: "numeric",
  };
  return dt.toLocaleDateString("en-GB", options);
};

const getWeekDayShort = (datetime) => {
  const weekDay = new Date(datetime);
  const optionsWeek = {
    weekday: "short",
  };
  return weekDay.toLocaleDateString("en-GB", optionsWeek).toUpperCase();
};

export const displayWeatherByDays = (weatherObject) => {
  const dayWeathers = document.querySelectorAll(".day");
  weatherObject.forEach((weather, idx) => {
    const {
      tempMax,
      tempMin,
      icon,
      datetime,
      precipProb,
      condition,
      description,
    } = weather;
    const mainDayElem = dayWeathers[idx];

    const dayWeek = mainDayElem.querySelector(".day-week");
    dayWeek.textContent = getWeekDayShort(datetime);

    const dayMonth = mainDayElem.querySelector(".day-month");
    dayMonth.textContent = getDateShort(datetime);

    const dayCondition = mainDayElem.querySelector(".condition");
    dayCondition.textContent = condition;

    const dayDescription = mainDayElem.querySelector(".description");
    dayDescription.textContent = description;

    const dayIcon = mainDayElem.querySelector(".icon-div");
    dayIcon.innerHTML = iconsDaySvg[icon];

    const dayTempMax = mainDayElem.querySelector(".day-temp-max");
    dayTempMax.textContent = `${Math.round(tempMax)}º`;

    const dayTempMin = mainDayElem.querySelector(".day-temp-min");
    dayTempMin.textContent = `${Math.round(tempMin)}º`;

    const dayPrecip = mainDayElem.querySelector(".day-precip>p");
    dayPrecip.textContent = `${Math.round(precipProb)}%`;
  });
};
