import {useContext, useEffect, useState} from "react";
import {WeatherContext} from "../context/Context";
import {Line} from "react-chartjs-2";
import {UilSpinnerAlt} from "@iconscout/react-unicons";
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale, Point } from 'chart.js';
import '../index.css'

Chart.register(CategoryScale, LinearScale);


const kelvin = 273.15;

function WeatherChart() {
    const {forecast} = useContext(WeatherContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const lowestTemp = (data) => {
        return data.reduce((min, item) => {
            return item.main.temp < min ? item.main.temp : min;
        }, Infinity);
    };

    const highestTemp = (data) => {
        return data.reduce((max, item) => {
            return item.main.temp > max ? item.main.temp : max;
        }, -Infinity);
    };

    const fixedFormat = (temp) => {
        return temp ? (temp - kelvin).toFixed() : null;
    };

    const getSequentialNumbers = (lowest, highest) => {
        let numbers = [];

        for (let i = lowest; i <= highest; i++) {
            numbers.push(i);
        }

        return numbers;
    };

    const renderChart = () => {
        if (isLoading || !forecast) {
            return <p>Loading...</p>;
        }

        const labels = forecast.list.map((item) => item.dt_txt);
        const temperatures = forecast.list.map((item) => item.main.temp);

        const lowest = Math.floor(lowestTemp(forecast.list));
        const highest = Math.ceil(highestTemp(forecast.list));
        const sequentialNumbers = getSequentialNumbers(lowest, highest);

        const data = {
            labels,
            datasets: [
                {
                    label: "Temperature",
                    data: temperatures.map((temp) => fixedFormat(temp)),
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                },
            ],
        };

        // const options = {
        //     scales: {
        //         y: {
        //             ticks: {
        //                 beginAtZero: true,
        //                 suggestedMax: 30, // maksimum değeri 30 olarak belirle
        //                 stepSize: 5, // aralıkların büyüklüğü 5 olsun
        //                 callback: (value) => {
        //                     if (typeof value === "string") {
        //                         return value.substring(11, 16);
        //                     }
        //                     return value;
        //                 },
        //             },
        //         },
        //         x: {
        //             ticks: {
        //                 callback: (value) => {
        //                     if (typeof value === "string") {
        //                         return value.substring(11, 16);
        //                     }
        //                     return value;
        //                 },
        //             },
        //         },
        //     },
        //     plugins: {
        //         legend: {
        //             display: true,
        //             position: "top",
        //             labels: {
        //                 fontColor: "#333",
        //                 fontSize: 16,
        //             },
        //         },
        //         title: {
        //             display: true,
        //             text: "Temperature Chart",
        //             fontSize: 20,
        //         },
        //     },
        // };

        const options = {
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 30,
                        stepSize: 5,
                        callback: (value) => {
                            if (typeof value === "string") {
                                return value.substring(11, 16);
                            }
                            return value;
                        },
                    },
                },
                x: {
                    ticks: {
                        callback: (value) => {
                            if (typeof value === "string") {
                                return value.substring(11, 16);
                            }
                            return value;
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        fontColor: "#333",
                        fontSize: 16,
                    },
                },
                title: {
                    display: true,
                    text: "Temperature Chart",
                    fontSize: 20,
                },
            },
            elements: {
                line: {
                    tension: 0.5
                }
            }
        };




        return <Line  data={data} options={options}/>;
    };

    return (
        <div className="weather-chart">
            {isLoading ? (
                <UilSpinnerAlt/>
            ) : !forecast || forecast.length === 0 ? (
                <UilSpinnerAlt/>
            ) : (
                <div>{renderChart()}</div>
            )}
        </div>
    );

}

export default WeatherChart;
