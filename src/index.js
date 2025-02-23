import { typingEffect } from "./createPhrasesInSearch";
import { displayMainWeather } from "./displayMainWeather";
import { displayWeatherByHours } from "./displayWeatherByHours";
import { displayWeatherByDays } from "./displayWeatherByDays";
import { getWeatherObject } from "./getWeather";
import "./styles.css";

const typing = document.querySelector(".typing");
const input = document.querySelector("input");
const errorCard = document.querySelector(".error-card");
const errorMessage = document.querySelector(".error-message");
const searchedPlace = document.querySelector(".searched-place");
const form = document.querySelector("form");

const controlWeatherError = (weatherObject, place) => {
  if (weatherObject) {
    displayWeatherByHours(weatherObject);
    displayWeatherByDays(weatherObject.slice(1, weatherObject.length));
    displayMainWeather(weatherObject);
    searchedPlace.textContent = place;
  } else {
    console.log("Error: No data for the city");
    input.classList.add("error");
    errorCard.classList.add("error-card-show");
    setTimeout(() => {
      input.classList.remove("error");
      errorCard.classList.remove("error-card-show");
    }, 3000);
  }
};

const showErrorInInput = () => {
  if (input.validity.valueMissing) {
    console.log("ValueMissing");
    errorMessage.textContent = "I am expecting a city!";
  } else if (input.validity.patternMismatch) {
    console.log("PatternMismatch");
    errorMessage.textContent = "Your city is not valid!";
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!input.validity.valid) {
    showErrorInInput();
  } else {
    if (errorMessage.textContent.length > 0) {
      errorMessage.textContent = "";
    }
    console.log("aqui2", input.value);

    const weather = await getWeatherObject(input.value);
    controlWeatherError(weather, input.value);
  }
});

typingEffect(typing, input);
// const initialWeather = await getWeatherObject("London");
// controlWeatherError(initialWeather);

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
