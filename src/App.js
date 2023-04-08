import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetail from "./components/TempAndDetail";
import Forecast from "./components/Forecast";
import WeatherProvider from "./context/Context";
import WeatherChart from "./components/WeatherCart";
import {useState, useEffect} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <div className="relative h-screen">
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center">
                    <div className="text-center">
                        <div
                            className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="text-gray-900 font-semibold mt-2">Yükleniyor...</p>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div
                    className={"mx-auto max-w-screen-sm sm:max-w-screen-md mt-0 py-2 px-4 sm:px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 h-auto overflow-hidden"}>
                    <WeatherProvider>
                        <TopButtons/>
                        <Inputs/>
                        <TimeAndLocation/>
                        <TempAndDetail/>
                        <Forecast/>
                        <WeatherChart/>
                    </WeatherProvider>
                </div>
            )}
        </div>
    );
}
export default App;
