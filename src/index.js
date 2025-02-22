import { typingEffect } from "./createPhrasesInSearch";
import { displayMainWeather } from "./displayMainWeather";
import { displayWeatherByHours } from "./displayWeatherByHours";
import { displayWeatherByDays } from "./displayWeatherByDays";
import { getWeatherObject } from "./getWeather";
import "./styles.css";

const typing = document.querySelector(".typing");
const input = document.querySelector("input");

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const weather = await getWeatherObject(input.value);
  displayMainWeather(weather);
});

typingEffect(typing, input);
// const initialWeather = await getWeatherObject("London");
// displayWeatherByHours(initialWeather);
// displayWeatherByDays(initialWeather.slice(1, initialWeather.length));
// displayMainWeather(initialWeather);

const modeButton = document.querySelector(".mode-button");
const body = document.querySelector("body");
modeButton.addEventListener("click", () => {
  modeButton.classList.toggle("dark");
  body.classList.toggle("dark");
  if (modeButton.classList.contains("dark")) {
    modeButton.setAttribute("title", "Switch to Light Mode");
  } else {
    modeButton.setAttribute("title", "Switch to Dark Mode");
  }
});
