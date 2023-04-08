import React, {createContext, useEffect, useState} from 'react';
import cities from '../cities.json';
export const WeatherContext = createContext()
const WeatherProvider = ({children}) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    const baseURL = process.env.REACT_APP_BASE_URL
    const [city, setCity] = useState(cities[33]);
    const [forecast, setForecast] = useState([]);
    useEffect(() => {
        async function fetchForecast() {
            const url = `${baseURL}/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            setForecast(data);
            console.log("datassss",data)
        }
        fetchForecast();

    }, [city]);
    const handleCityChange = (event) => {
        const cityIndex = event.target.value;
        setCity(cities[cityIndex]);
    }
    return (
        < WeatherContext.Provider value={{forecast, handleCityChange, setCity, city,cities}}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;