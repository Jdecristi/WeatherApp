import React, { useState, useEffect } from 'react';
import { clouds, clear, rain, snow, brokenClouds } from './WeatherStyles'

//Components
import Cloud  from './WeatherIcons/Cloud';
import CelestialBody from './WeatherIcons/CelestialBody';
import RainDrop from './WeatherIcons/RainDrop';
import SnowBall from './WeatherIcons/SnowBall';
import LighningBolt from './WeatherIcons/LightningBolt';


//Weather Data
import weatherData from '../../helpers/WeatherData';

const WeatherStyle: React.FC = () => {
    const day = weatherData.day ? 'day' : 'night';

    return (
        <>
            <div className="container">
                {weatherData.main === 'CLEAR' ||
                 weatherData.main === 'CLOUDS' ||
                 weatherData.main === 'ATMOSPHERE'
                    ? clear[day].map(d => (
                        <CelestialBody 
                            key={clear[day].indexOf(d)}
                            insideColor={d.insideColor} 
                            outsideColor={d.outsideColor}
                            size={d.size} 
                            position={d.position} zIndex={d.zIndex}
                        />
                    ))
                    : null}
                {weatherData.main === 'CLOUDS'
                    ? brokenClouds.map(c => (
                        <Cloud 
                            key={brokenClouds.indexOf(c)}
                            type={c.type} 
                            color={c.color} 
                            size={c.size} 
                            position={c.position}
                            zIndex={c.zIndex}
                        />
                    ))
                    :null}
                {weatherData.main === 'RAIN' ||
                 weatherData.main === 'SNOW' ||
                 weatherData.main === 'THUNDERSTORM'
                    ? clouds.map(c => (
                        <Cloud 
                            key={clouds.indexOf(c)}
                            type={c.type} 
                            color={c.color} 
                            size={c.size} 
                            position={c.position}
                            zIndex={c.zIndex}
                        />
                    ))
                    : null}
                {weatherData.main === 'RAIN' ||
                 weatherData.main === 'DRIZZLE' ||
                 weatherData.main === 'THUNDERSTORM'
                    ? rain.map(r => (<RainDrop position={r.position}/>)) 
                    : null}
                {weatherData.main === 'SNOW'
                    ? snow.map(r => (<SnowBall position={r.position}/>)) 
                    : null}
                {weatherData.main === 'THUNDERSTORM'
                ?  <LighningBolt />
                : null}
            </div>

            <style jsx>
                {`
                    .container {
                        position: fixed;
                        font-size: 1vw;
                        top: 20%;
                        left: 20%;
                        transform: translateY(-50%);
                    }
                    @media (max-width: 1100px) {
                        .container {
                            font-size: 1.75vw;
                            top: 15%;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                `}
            </style>
        </>
    )
}

export default WeatherStyle;