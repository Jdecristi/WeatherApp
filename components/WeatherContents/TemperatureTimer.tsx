/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";

//Weather Data
import weatherData from "../../helpers/WeatherData";

const unitSign = {
  METRIC: "C",
  IMPERIAL: "F",
  KELVIN: "K",
};

const TemperatureTimer: React.FC = () => {
  const [temp, setTemp] = useState<number>(0);

  useEffect(() => {
    const belowZero = weatherData.temperature < 0;

    if (temp > Math.round(weatherData.temperature - 1)) return;

    setTimeout(() => {
      belowZero ? setTemp(temp - 1) : setTemp(temp + 1);
    }, 10);
  }, [temp]);

  return (
    <>
      <div className="container">
        <h1>{temp}° </h1>
        <h4>{unitSign[weatherData.units]}</h4>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: flex-end;
            align-items: start;
          }
          h1,
          h4 {
            color: #${weatherData.day ? "333333" : "EEEEEE"};
            font-weight: normal;
            margin: 0;
          }
          h1 {
            font-size: 5em;
          }
          h4 {
            margin-top: 0.5em;
            font-size: 1.5em;
          }
        `}
      </style>
    </>
  );
};
export default TemperatureTimer;
