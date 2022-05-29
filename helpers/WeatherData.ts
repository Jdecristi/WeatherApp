export interface Data {
    date:        string;
    day:         boolean;
    main:        string;
    temperature: number;
    weather:     string;
    location:    {
        city:    string;
        country: string;
    };
    units:       string;

}

const SunCalc = require('suncalc');

let weatherData: Data = {
    date:        '',
    day:         true,
    main:        '',
    temperature: 0,
    weather:     "",
    location:    {
        city:    "",
        country: "",
    },
    units:       '',
}

export const getWeatherData = async (city: string, units: string) => {
    let coors = {lat: 0, lon: 0};

    const getDateTime = (lat: number, lon: number) => {
        const dateTime = new Date()
        const currentLocalTime = (dateTime.getUTCHours() * 60) + dateTime.getUTCMinutes() + (lon * 4);

        const sunCalc = SunCalc.getTimes(dateTime, lat, lon);
        let sunrise = (sunCalc.sunrise.getUTCHours() * 60) + sunCalc.sunrise.getUTCMinutes() + (lon * 4);
        let sunset = (sunCalc.sunset.getUTCHours() * 60) + sunCalc.sunset.getUTCMinutes() + (lon * 4);

        if(sunrise >= 1440) sunrise = sunrise - 1440;
        if(sunset >= 1440) sunset = sunset - 1440;

        weatherData.day = (currentLocalTime >= sunrise && currentLocalTime <= sunset ) ? true : false;
        weatherData.date = dateTime.toLocaleDateString().toUpperCase();

    }

    const getlocation = async (city: string) => {
        await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if(data.message) {
                    return 'Were Expirencing techincal difficulties please try again later'
                }

                weatherData.location.city = data[0].name;
                weatherData.location.country = data[0].country;
                coors = {lat: data[0].lat, lon: data[0].lon};
            });
    }

    const getWeather = async (lat: number, lon: number, units: string) => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=${units}`)
            .then(response => response.json())
            .then(data => {
                weatherData.temperature = data.main.temp;
                weatherData.weather = data.weather[0].description.toUpperCase();
                weatherData.main = data.weather[0].main.toUpperCase();
                weatherData.units = units.toUpperCase();
            });
    }

    await getlocation(city);
    await getWeather(coors.lat, coors.lon, units);
    getDateTime(coors.lat, coors.lon)
}

export default weatherData;
