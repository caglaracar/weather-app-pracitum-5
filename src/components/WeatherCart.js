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

        const labels = forecast.list
            .slice(0, 8)
            .map((item) => item.dt_txt.substring(11, 16));
        const temperatures = forecast.list
            .slice(0, 8)
            .map((item) => fixedFormat(item.main.temp));

        const data = {
            labels,
            datasets: [
                {
                    label: "°C",
                    data: temperatures,
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    hoverBackgroundColor: "rgba(75,192,192,0.8)",
                    hoverBorderColor: "rgba(75,192,192,1)"
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 30,
                        stepSize: 5,
                    },
                    title: {
                        display: true,
                        text: "Sıcaklık (°C)",
                        color: "#666666",
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    },
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                },
                x: {
                    ticks: {
                        stepSize: 2,
                    },
                    grid: {
                        display: false
                    }
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
                    text: "Günlük Hava Durumu Grafiği",
                    fontSize: 20,
                },
            },
            elements: {
                line: {
                    tension: 0.5
                }, point: {
                    hitRadius: 10,
                    hoverRadius: 5,
                    hoverBorderWidth: 2,
                    radius: 5,
                    pointStyle: 'circle'
                }
            }
        };

        return <Line data={data} options={options} />;
    };

    return (
        <div className="weather-chart">
            {isLoading ? (
                <UilSpinnerAlt />
            ) : !forecast || forecast.length === 0 ? (
                <p>No data available</p>
            ) : (
                <div>{renderChart()}</div>
            )}
        </div>
    );
}

export default WeatherChart;