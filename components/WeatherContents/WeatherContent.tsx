/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";

//Components
import TemperatureTimer from "./TemperatureTimer";

//Weather Data
import weatherData from "../../helpers/WeatherData";

const WeatherContent: React.FC = () => {
  return (
    <>
      <div className="container">
        <h2>
          {weatherData.location.city.toUpperCase()}{" "}
          {weatherData.location.country.toUpperCase()}
        </h2>
        <TemperatureTimer />
        <h3>{weatherData.weather.toUpperCase()}</h3>
        <h3>{weatherData.date.toUpperCase()}</h3>
      </div>

      <style jsx>
        {`
          .container {
            width: 50vw;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: end;
            position: fixed;
            font-size: 2.5vw;
            top: 50%;
            left: 70%;
            transform: translate(-50%, -50%);
          }
          h2,
          h3 {
            color: #${weatherData.day ? "333333" : "EEEEEE"};
            font-weight: normal;
          }

          h2 {
            font-size: 2em;
            margin: 0.1em 0;
          }

          h3 {
            font-size: 1em;
            margin: 0.1em 0;
          }

          @media (max-width: 1100px) {
            .container {
              width: 100vw;
              font-size: 3vw;
              align-items: center;
              top: 70%;
              left: 50%;
            }
          }
          @media (max-width: 700px) {
            .container {
              width: 100vw;
              font-size: 5vw;
              align-items: center;
              top: 70%;
              left: 50%;
            }
          }
        `}
      </style>
    </>
  );
};

export default WeatherContent;
