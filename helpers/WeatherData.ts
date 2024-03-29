import { PUBLIC_OPENWEATHER_API_KEY } from "../helpers/env";

export type Units = "METRIC" | "IMPERIAL" | "KELVIN";

export interface Data {
  date: string;
  day: boolean;
  main: string;
  temperature: number;
  weather: string;
  location: {
    city: string;
    country: string;
  };
  units: Units;
}

const SunCalc = require("suncalc");

let weatherData: Data = {
  date: "",
  day: true,
  main: "",
  temperature: 0,
  weather: "",
  location: {
    city: "",
    country: "",
  },
  units: "KELVIN",
};

export const getWeatherData = async (city: string, units: string) => {
  let coors = { lat: 0, lon: 0 };

  const getDateTime = (lat: number, lon: number) => {
    const dateTime = new Date();
    const localTimeDifference = Math.round(lon / 15) * 60;
    const currentLocalTime =
      dateTime.getUTCHours() * 60 +
      dateTime.getUTCMinutes() +
      localTimeDifference;

    const sunCalc = SunCalc.getTimes(dateTime, lat, lon);
    let sunrise =
      sunCalc.sunrise.getUTCHours() * 60 +
      sunCalc.sunrise.getUTCMinutes() +
      localTimeDifference;
    let sunset =
      sunCalc.sunset.getUTCHours() * 60 +
      sunCalc.sunset.getUTCMinutes() +
      localTimeDifference;

    const reCalculateTime = (time: number) => {
      if (time >= 1440) return time - 1440;
      if (time < 0) return time + 1440;
      return time;
    };

    weatherData.day =
      currentLocalTime >= reCalculateTime(sunrise) &&
      currentLocalTime <= reCalculateTime(sunset);
    weatherData.date = dateTime.toLocaleDateString().toUpperCase();
  };

  const getlocation = async (city: string) => {
    try {
      const data = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${PUBLIC_OPENWEATHER_API_KEY}`
      ).then((response) => response.json());
      if (data.message) {
        return "Were Expirencing techincal difficulties please try again later";
      }

      weatherData.location.city = data[0].name;
      weatherData.location.country = data[0].country;
      coors = { lat: data[0].lat, lon: data[0].lon };
    } catch (_err) {
      console.log(_err);
    }
  };

  const getWeather = async (lat: number, lon: number, units: string) => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${PUBLIC_OPENWEATHER_API_KEY}&units=${units}`
      ).then((response) => response.json());

      weatherData.temperature = data.main.temp;
      weatherData.weather = data.weather[0].description.toUpperCase();
      weatherData.main = data.weather[0].main.toUpperCase();
      weatherData.units = units.toUpperCase() as Units;
    } catch (_err) {
      console.log(_err);
    }
  };

  await getlocation(city);
  await getWeather(coors.lat, coors.lon, units);
  getDateTime(coors.lat, coors.lon);
};

export default weatherData;
