import React, { useContext } from 'react';
import { WeatherContext } from '../context/Context';

const TopButtons = () => {
    // Get the `cities` array and `handleCityChange` function from the WeatherContext

    const { cities, handleCityChange } = useContext(WeatherContext);
    return (
        // Render a list of buttons for the selected cities

        <div className="flex flex-row md:flex-row items-center justify-around my-6">
            {cities
                .filter(city => city.id===5||city.id===33|| city.id===9|| city.id===25|| city.id===34)
                .map(city => (
                    <button
                        onClick={e => handleCityChange(e)}
                        value={city.id}
                        key={city.id}
                        className="text-white text-base font-medium hover:opacity-75 cursor-pointer my-2 mx-2 md:my-0 md:mx-2"
                    >
                        {city.name}
                    </button>
                ))}
        </div>
    );
};

export default TopButtons;