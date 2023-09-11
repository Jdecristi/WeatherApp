/* eslint-disable react/no-unknown-property */
//Libraries
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";

//Components
import WeatherStyle from "../components/WeatherStyles/WeatherStyle";
import WeatherContent from "../components/WeatherContents/WeatherContent";
import SettingsBar from "../components/settings/SettingsBar";
import LoadingImage from "../components/LoadingSpinner";

//Weather Data
import weatherData, { getWeatherData } from "../helpers/WeatherData";

const Home: NextPage = () => {
  const [weatherDataLoaded, updateWeatherDataLoaded] = useState<boolean>(false);

  const newSearch = (location: string, units: string) => {
    updateWeatherDataLoaded(false);

    getWeatherData(location, units).then(() => {
      updateWeatherDataLoaded(true);
      localStorage.setItem(
        "recentSearch",
        JSON.stringify({ location: location, units: units })
      );
    });
  };

  useEffect(() => {
    const recentSearch = localStorage.getItem("recentSearch")
      ? JSON.parse(localStorage.getItem("recentSearch") || "{}")
      : { location: "Denver", units: "imperial" };

    newSearch(recentSearch.location, recentSearch.units);
  }, []);

  console.log(weatherData.day);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/images/logo_icon.svg" />
      </Head>

      <>
        {weatherDataLoaded ? (
          <div className="container">
            <WeatherStyle />
            <WeatherContent />
            <SettingsBar newSearch={newSearch} />
          </div>
        ) : (
          <div className="loading">
            <LoadingImage />
          </div>
        )}
      </>

      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            background: radial-gradient(
              100% 100% at 50% 100%,
              ${weatherData.day ? "#fefee2" : "#C7A37F"},
              ${weatherData.day ? "#8ff8fe" : "#300293 75%"}
            );
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .loading {
            background-color: #333333;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default Home;
