import { typingEffect } from "./createPhrasesInSearch";
import { displayMainWeather } from "./displayMainWeather";
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
const initialWeather = await getWeatherObject("London");
displayMainWeather(initialWeather);
