import React, {useContext, useEffect, useState} from 'react';
import {WeatherContext} from "../context/Context";
import {UilSpinnerAlt} from "@iconscout/react-unicons";

const Forecast = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {forecast} = useContext(WeatherContext);
    const kelvin = 273.15;

    // forecast değişkeni güncellendiğinde isLoading durumunu false olarak ayarlayan useEffect kullanıyoruz.

    useEffect(() => {
        setIsLoading(false);
    }, [forecast]);

    // Verilen dizi öğelerinin en yüksek sıcaklığını hesaplar

    const calculateTempMax = (items) => {
        return items?.reduce((max, item) => {
            return item.main.temp_max > max ? item.main.temp_max : max;
        }, -Infinity);
    };
// Verilen dizi öğelerinin en düşük sıcaklığını hesaplar

    const calculateTempMin = (items) => {
        return items?.reduce((min, item) => {
            return item.main.temp_min < min ? item.main.temp_min : min;
        }, Infinity);
    };
    // Verilen sıcaklık değerini kelvin'den Celsius'a çevirir ve ondalık kısmı kaldırır

    const fixedFormat = (temp) => {
        return temp.toFixed() ? (temp - kelvin).toFixed() : null;
    };
    return (
        <>
            {isLoading ? (
                <UilSpinnerAlt/>
            ) : !forecast || forecast.length === 0 ? (
                <UilSpinnerAlt/>
            ) : (
                <div>
                    <div className={"flex flex-wrap justify-between text-white"}>
                        {forecast?.list
                            ?.filter((item, index) => [0, 9, 18, 27, 36].includes(index))
                            .map((item) => {
                                const date = new Date(item.dt_txt);
                                const dayOfWeek = date.toLocaleDateString('tr-TR', {weekday: 'long'});
                                const dayItems = forecast.list.filter((listItem) => {
                                    const listItemDate = new Date(listItem.dt_txt);
                                    return date.getDate() === listItemDate.getDate();
                                });
                                const maxTemp = calculateTempMax(dayItems);
                                const minTemp = calculateTempMin(dayItems);
                                return (
                                    <div className={"flex  flex-col items-center justify-center mx-2 my-2 sm:my-0"}
                                         key={dayOfWeek}>
                                        <div
                                            className={`text-center ${window.innerWidth >= 768 ? 'mx-4 my-2' : ''}`}>
                                            <h6 className={"font-medium text-sm"}>{dayOfWeek}</h6>
                                            <img
                                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                                className={"w-12 m-auto"}
                                                alt="forecast"
                                            />
                                            <div className={"flex-row text-left"}>
                                                <p className={"font-thin"}>En yüksek: {fixedFormat(maxTemp)}°</p>
                                                <p className={"font-thin"}>En Düşük: {fixedFormat(minTemp)}°</p>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <hr className={"my-2"}/>
                </div>
            )}
        </>
    );
};

export default Forecast;
