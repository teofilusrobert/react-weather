import React from 'react'
import { WeatherData } from '../../interfaces/weather'
import { formatDate } from '../../utils';
import './WeatherCard.css'

interface WeatherCardProps {
    weather: WeatherData
}

const WeatherCard: React.FC<WeatherCardProps> = ({weather}) => {
    return (
        <div className="card">
            <h3>{weather.city}, {weather.country}</h3>
            <div className="info">
                <div className='temp-container'>
                    <p className='temp'>{weather.temperature}°C</p>
                    <p>{weather.weather_description}</p>
                </div>
                <div>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind: {weather.wind_speed} km/h</p>
                </div>
            </div>
            <div className="forecast">
                <ul>
                    {weather.forecast.map((forecast, index) => (
                        <li key={index}>
                            <div>
                                <strong>{formatDate(forecast.date)}</strong>: {forecast.temperature}°C {forecast.weather_description} 
                            </div>
                            <div>
                                H: {forecast.humidity}%, W: {forecast.wind_speed} km/h
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
  };
  
  export default WeatherCard;