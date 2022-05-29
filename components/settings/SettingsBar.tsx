import React, { useState, useEffect } from 'react';

//Components
import Dropdown from '../Dropdown';

//Weather Data
import weatherData from '../../helpers/WeatherData';

interface Props {
    newSearch: (location: string, units: string) => void;
}

const SettingsBar: React.FC <Props> = (props) => {
    const { newSearch } = props;

    const [units, updateUnits] = useState<string>(weatherData.units);
    const [unitAlias, updateUnitAlias] = useState<string>('');
    const [location, updateLocation] = useState<string>(weatherData.location.city);
    const [open, updateOpen] = useState<boolean>(false);

    useEffect(() => {
        switch (units){
            case 'METRIC':
                updateUnitAlias('CELCIUS')
            break;
            case 'IMPERIAL':
                updateUnitAlias('FAHRENHEIT')
            break;
            case 'KELVIN':
                updateUnitAlias('KELVIN')
            break;
        }
    })

    const updateUnitFromAlias = (alias: string) => {
        switch (alias){
            case 'CELCIUS':
                updateUnits('METRIC')
            break;
            case 'FAHRENHEIT':
                updateUnits('IMPERIAL')
            break;
            case 'KELVIN':
                updateUnits('KELVIN')
            break;
        }
    }

    return (
        <>  <div className="container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="search-icon" onClick={() => updateOpen(!open)}>
                    <path 
                        d="
                            M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2
                            1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236
                            144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1
                            208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                        />
                </svg>
                {open ?  
                    <div className="content">
                        <input 
                            type="text" 
                            className="search-location" 
                            placeholder="SEARCH A CITY (DENVER)" 
                            onChange={e => updateLocation(e.target.value)}
                            onKeyDown={e => (e.key === 'Enter') ?newSearch(location, units) :null}
                        />
                        <Dropdown 
                            darkMode={!weatherData.day}
                            items={['FAHRENHEIT', 'CELCIUS', 'KELVIN']} 
                            selected={unitAlias} 
                            updateSelected={updateUnitFromAlias}
                        />
                        <button 
                            className="btn" 
                            onClick={() => newSearch(location, units)}
                            onKeyDown={e => (e.key === 'Enter') ?newSearch(location, units) :null}
                        >
                            Search
                        </button>
                    </div>
                : null} 
            </div>  

            <style jsx>
                {`
                    .container {
                        font-size: 1vw;
                        position: fixed;
                        bottom: 2em;
                        right: 2em;
                        width: ${!open ? '3em' : null};
                        height: 3em;
                        padding: .75em;
                        background-color: #${weatherData.day ?'333333'  :'EEEEEE'};
                        border-radius: .25em;
                        display: flex;
                        gap: 1em;
                        align-items: center;
                    }
                    .search-icon {
                        height: 1.5em;
                        cursor: pointer;
                        fill: #${weatherData.day ?'FFFFFF' :'333333'};
                    }
                    .content {
                        display: flex;
                        gap: 1em;
                        align-items: center;
                    }
                    .search-location,
                    .btn {
                        background-color: #${weatherData.day ? '555555': 'DDDDDD'};
                        color: #${weatherData.day ?'FFFFFF' :'333333'};
                        border: none;
                        border-radius: .25em;
                        height: 2.5em;
                        font-size: .75em;
                    }
                    .search-location:hover,
                    .btn:hover {
                        background-color: #${weatherData.day ? '666666': 'BBBBBB'};
                    }
                    .search-location { 
                        font-family: roboto;
                        padding: 0 1em;

                    }
                    .search-location:focus {
                        outline: none;
                    } 
                    .btn {
                        padding: .1em 2em;
                        cursor: pointer;
                    }

                    @media (max-width: 1100px) {
                        .container{
                            font-size: 2.5vw;
                        }
                    }
                    @media (max-width: 600px) {
                        .container{
                            font-size: 3.25vw;
                        }
                    }
                `}
            </style>
        </>
    )
}

export default SettingsBar;