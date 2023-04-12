import React, {useContext} from 'react';
import { UilLocationPoint} from '@iconscout/react-unicons'
import {WeatherContext} from "../context/Context";
import '../index.css'
const Inputs = () => {
    const {cities,handleCityChange,city} = useContext(WeatherContext)
    return (
        <div className={"flex flex-col justify-center my-6 md:flex-row md:justify-center"}>
            <div className={"flex flex-row items-center w-auto md:w-auto justify-center md:justify-start space-x-4"}>
                <select
                    className="appearance-none w-auto md:w-64 bg-white border border-gray-400 hover:border-gray-500 focus:border-blue-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline select"
                    value={cities.indexOf(city)}
                    onChange={handleCityChange}
                >
                    {cities.map((c, i) => (
                        <option key={i} value={i}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <UilLocationPoint
                    size={25}
                    className={"text-white cursor-pointer transition ease-out hover:scale-125 md:block hidden"}
                    onClick={}
                />
            </div>
        </div>
    );
};
export default Inputs;

