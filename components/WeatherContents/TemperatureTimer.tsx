import React, {useEffect, useState } from 'react';

//Weather Data
import weatherData from '../../helpers/WeatherData';

const TemperatureTimer: React.FC = () => {
    
    const [newTemp, updateNewTermp] = useState<number>(0);
    const [timer, updateTimer] = useState<number>(0);
    const [unitSign, updateUnitSign] = useState<string>('F');

    useEffect(() => {
        let roundedTemp = Math.round(weatherData.temperature);
        if (newTemp < roundedTemp) {
            setTimeout(() =>{
                if (newTemp > roundedTemp - 15) {
                    updateTimer(timer + 15);
                }

                updateNewTermp(newTemp + 1);
            }, timer);
        }
    }, [newTemp, timer]);

    useEffect(() => {
        switch (weatherData.units){
            case 'METRIC':
                updateUnitSign('C')
            break;
            case 'IMPERIAL':
                updateUnitSign('F')
            break;
            case 'KELVIN':
                updateUnitSign('K')
            break;
        }
    })

    return (
        <>
            <div className="container">
                <h1>{newTemp}° </h1>
                <h4>{unitSign}</h4>
            </div>
            <style jsx>
                {`  
                    .container {
                        display: flex;
                        justify-content: flex-end;
                        align-items: start;
                    }
                    h1,
                    h4
                    {
                        color: #${weatherData.day ? '333333' : 'EEEEEE'};
                        font-weight: normal;
                        font-family: roboto;
                        margin: 0;
                    }
                    h1 {
                        font-size: 5em;
                    }
                    h4 {
                        margin-top: .5em;
                        font-size: 1.5em;
                    }
                `}
            </style>
        </>
    )

}
export default TemperatureTimer;