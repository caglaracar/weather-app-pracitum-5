import React, {useContext} from 'react';
import {WeatherContext} from "../context/Context";
import Clock from 'react-live-clock';

const TimeAndLocation = () => {
    // WeatherContext'ten city'yi alıyoruz

    const{city}=useContext(WeatherContext)
    return (
        <div className={"flex flex-col items-center justify-center "}>
            <div className={"flex items-center justify-center"}>
                <p className={"text-white text-xl font-extralight"}>
                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Istanbul'} />
                </p>
            </div>
            <div className={"flex items-center justify-center my-3"}>
                <p className={"text-white text-3xl font-medium text-center"}>
                    {city?.name?.toUpperCase()}
                </p>
            </div>
        </div>
    );
};

export default TimeAndLocation;