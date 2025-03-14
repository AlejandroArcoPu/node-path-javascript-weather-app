export default class DayWeather {
  constructor(
    datetime,
    icon,
    tempMax,
    tempMin,
    precipProb,
    condition,
    description,
    hours = [],
    moonphase,
    timezone,
    address
  ) {
    this.datetime = datetime;
    this.icon = icon;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.precipProb = precipProb;
    this.condition = condition;
    this.description = description;
    this.hours = hours;
    this.moonphase = moonphase;
    this.timezone = timezone;
    this.address = address;
  }
}
