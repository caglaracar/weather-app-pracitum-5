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
            // API'den hava durumu tahmini verilerini çekmek için kullanılan fonksiyon

            const url = `${baseURL}/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            setForecast(data);
            console.log("datassss",data)
        }
        fetchForecast();

    }, [city]);
    // Şehir seçiminde kullanılan fonksiyon

    const handleCityChange = (event) => {
        console.log(event.target.value)
        const cityIndex = event.target.value;
        setCity(cities[cityIndex]);
    }
    const handleLocationButtonClick =  () => {

        if (navigator.geolocation) {
            // Kullanıcının konum bilgisini almak için kullanılan fonksiyon

            navigator.geolocation.getCurrentPosition (async(position) => {
                const { latitude, longitude } = position.coords;

                // Kullanıcının posta kodunu almak için kullanılan API

               await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                    .then(response => response.json())
                    .then(data => {
                        const postcode = data.postcode;
                        console.log("Plaka Kodu: " + postcode.substring(0,2));
                        setCity(cities[postcode.startsWith(0)?postcode.substring(1,2)-1:postcode.substring(0,2)-1])
                    })
                    .catch(error => console.log(error));
            });
        }
        else {
            alert("Konum bilginize erişmek laızm")
        }
    };
    // WeatherContext ile wrap edilen bileşenin döndürüldüğü kısım

    return (
        < WeatherContext.Provider value={{forecast, handleCityChange, setCity, city,cities,handleLocationButtonClick}}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;