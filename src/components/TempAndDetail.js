import React, {useContext, useEffect, useState} from 'react';
import {
    UilArrowDown,
    UilArrowUp,
    UilSun,
    UilSunset,
    UilTear,
    UilTemperature,
    UilWind,
    UilSpinnerAlt
} from "@iconscout/react-unicons";
import {WeatherContext} from "../context/Context";
const TempAndDetail = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {forecast} = useContext(WeatherContext);
    useEffect(() => {
        setIsLoading(false)
    }, [forecast])
    const kelvin = 273.15;
    const {main, weather, wind} = forecast?.list?.[0] || {};
    const {temp, feels_like, humidity} = main || {};
    const {speed: windSpeed} = wind || {};
    const iconUrl = weather ? `http://openweathermap.org/img/wn/${weather[0]?.icon}.png` : null;
    const fixedFormatedSunrise = () => {
        const sunriseDate = new Date(forecast.city.sunrise * 1000);
        return {
            sunriseHours: sunriseDate.getHours(),
            sunriseMinutes: sunriseDate.getMinutes() < 10 ? "0" + sunriseDate.getMinutes() : sunriseDate.getMinutes()
        }
    }
    const fixedFormatedSunset = () => {
        const sunriseDate = new Date(forecast.city.sunset * 1000);
        return {
            sunriseHours: sunriseDate.getHours(),
            sunriseMinutes: sunriseDate.getMinutes() < 10 ? "0" + sunriseDate.getMinutes() : sunriseDate.getMinutes()
        }
    }
    const fixedFormat = (temp) => {
        return temp.toFixed() ? (temp - kelvin).toFixed() : null
    }
    const calculateTempMax = () => {
        return forecast?.list?.reduce((max, item) => {
            return item.main.temp_max > max ? item.main.temp_max : max;
        }, -Infinity);
    };
    const calculateTempMin = () => {
        return forecast?.list?.reduce((min, item) => {
            return item.main.temp_min < min ? item.main.temp_min : min;
        }, Infinity);
    };
    return (
        <>
            {isLoading ? (
                <UilSpinnerAlt/>
            ) : !forecast || forecast.length === 0 || !main ? (
                <UilSpinnerAlt/>
            ) : (
                <div className="flex flex-col items-center justify-center text-white py-0">
                    <div className="flex items-center justify-center text-white py-0">
                        <img src={iconUrl} className="w-20 mr-2" alt="weather icon"/>
                        <p className="text-5xl">{fixedFormat(temp)}° </p>
                        <div className="ml-4">
                            <div className="flex font-light text-sm items-center">
                                <UilTemperature size={18} className="mr-1"/>
                                <span>Hissedilen Sıcaklık:</span>
                                <span className="font-medium ml-1">{fixedFormat(feels_like)}</span>
                            </div>
                            <div className="flex font-light text-sm items-center">
                                <UilTear size={18} className="mr-1"/>
                                <span>Nem:</span>
                                <span className="font-medium ml-1">{humidity}%</span>
                            </div>
                            <div className="flex font-light text-sm items-center">
                                <UilWind size={18} className="mr-1"/>
                                <span>Rüzgar Hızı:</span>
                                <span className="font-medium ml-1">{windSpeed.toFixed(1)} km/h</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className={"flex flex-row items-center justify-center space-x-3 text-white text-sm py-3"}>
                            <UilSun/>
                            <p className={"font-light"}>Gün Doğum <span
                                className={"font-medium ml-1"}>{fixedFormatedSunrise().sunriseHours}:{fixedFormatedSunrise().sunriseMinutes}AM </span>
                            </p>
                            <UilSunset/>
                            <p className={"font-light"}>Gün Batım <span
                                className={"font-medium ml-1"}> {fixedFormatedSunset().sunriseHours}:{fixedFormatedSunset().sunriseMinutes}PM </span>
                            </p>
                            <UilArrowUp/>
                            <p className={"font-light"}> 5 Günlük <span
                                className={"font-medium ml-1"}>{fixedFormat(calculateTempMax())}°</span></p>
                            <UilArrowDown/>
                            <p className={"font-light"}> 5 Günlük <span
                                className={"font-medium ml-1"}>{fixedFormat(calculateTempMin())}°</span></p>
                        </div>
                    </div>
                </div>

            )}
        </>

    );
};
export default TempAndDetail;
