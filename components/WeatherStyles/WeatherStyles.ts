import { randomBetween } from '../../helpers/HelperFunctions';


//Types
import { CloudType } from './WeatherIcons/Cloud';
import { CelestialBodyType } from './WeatherIcons/CelestialBody';
import { RainDropType } from './WeatherIcons/RainDrop';
import { SnowBallType } from './WeatherIcons/SnowBall';

const clear: {day: CelestialBodyType[], night: CelestialBodyType[]} = {
    day:    [
        {insideColor: '#FFFFFF', outsideColor: '#FFF5BE', size: 10, position: {x: -7.5, y: -5}, zIndex: 2},
        {insideColor: '#FFF5BE', outsideColor: '#FFFFFF00', size: 25, position: {x: -12.5, y: -12.5}, zIndex: 1},
    ],
    night:  [
        {insideColor: '#EEEEEE', outsideColor: '#CCCCCC',   size: 5,   position: {x: -5, y: -6}, zIndex: 2},
        {insideColor: '#FFFFFF50', outsideColor: '#FFFFFF00', size: 10,   position: {x: -7.5, y: -8.6}, zIndex: 1},
    ]
}

const brokenClouds: CloudType[] = [
    {type: 0, color: '#FFFFFF', size: 30, position: {x: 5,    y: -7.5}, zIndex: 25},
    {type: 0, color: '#EEEEEE', size: 25, position: {x: -7.5, y: -2.5}, zIndex: 20},
    {type: 3, color: '#DDDDDD', size: 35, position: {x: -10,  y: 2.5},  zIndex: 15},
    {type: 2, color: '#EEEEEE', size: 5,  position: {x: 25,   y: 15},   zIndex: 10},
    {type: 1, color: '#EEEEEE', size: 5,  position: {x: -10,  y: 20},   zIndex: 5},
];

const clouds: CloudType[] = [
    {type: 1, color: '#EEEEEE', size: 10,  position:{x: 40,    y: -5},   zIndex: 20},
    {type: 0, color: '#FFFFFF', size: 30, position: {x: 10,    y: -5},   zIndex: 35},
    {type: 0, color: '#EEEEEE', size: 35, position: {x: -7.5,  y: -2.5}, zIndex: 30},
    {type: 3, color: '#DDDDDD', size: 35, position: {x: 10,    y: 5},    zIndex: 25},
    {type: 3, color: '#CCCCCC', size: 35, position: {x: -12.5, y: 7.5},  zIndex: 20},
    {type: 3, color: '#BBBBBB', size: 45, position: {x: -10,   y: 10},   zIndex: 15},
    {type: 2, color: '#EEEEEE', size: 10, position: {x: 25,    y: 30},   zIndex: 10},
    {type: 1, color: '#EEEEEE', size: 5,  position: {x: -10,   y: 30},   zIndex: 5},
];

const rain: RainDropType[] = [];
const snow: SnowBallType[] = [];

for(let r= 0; r < 50; r++) {
    let item = {position: {x: randomBetween(-25, 75), y: -20}};
    rain.push(item);
    snow.push(item);
}


export {clear, brokenClouds, clouds, rain, snow }