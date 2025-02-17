export default class HourWeather {
  constructor(
    datetime,
    temp,
    precipMm,
    humidity,
    wind,
    uvIndex,
    pressure,
    precipProb,
    icon,
    conditions,
    feelsLike
  ) {
    this.datetime = datetime;
    this.temp = temp;
    this.precipMm = precipMm;
    this.humidity = humidity;
    this.wind = wind;
    this.uvIndex = uvIndex;
    this.pressure = pressure;
    this.precipProb = precipProb;
    this.icon = icon;
    this.conditions = conditions;
    this.feelsLike = feelsLike;
  }
}
