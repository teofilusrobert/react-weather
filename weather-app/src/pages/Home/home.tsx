import React, { useEffect, useMemo, useState } from 'react'
import { WeatherData } from '../../shared/interfaces/weather'
import { fetchWeather } from '../../shared/api/weather'
import WeatherCard from '../../shared/ui/WeatherCard/WeatherCard'
import Slider from '../../shared/ui/Slider/Slider';
import SearchInput from '../../shared/ui/SearchInput/SearchInput';
import Loading from '../../shared/ui/Loading/Loading';
import './home.css';

const DEFAULT_LIMIT = 5
const LIMIT_INCREMENT = 5
const MAX_DATA = 51

const WeatherApp: React.FC = () => {
  const [searchCity, setSearchCity] = useState('')
  const [debouncedSearchCity, setDebouncedSearchCity] = useState(searchCity)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [weatherList, setWeatherList] = useState<WeatherData[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [minTempFilter, setMinTempFilter] = useState<number>(0);
  const weatherListFiltered = useMemo(() => {
    if (!weatherList || weatherList.length < 0) return []
    return weatherList.filter((weather) => weather.temperature > minTempFilter);
  }, [weatherList, minTempFilter]);

  const handleParameterChange = async () => {
    setLoading(true)
    setError('')
    
    try {
      const data = await fetchWeather(limit, debouncedSearchCity)
      setWeatherList(data)
    } catch (err) {
      setError('Could not fetch weather data.')
    } finally {
      setLoading(false)
    }
  };

  const handleShowMore = () => {
    setLimit(limit + LIMIT_INCREMENT)
  }

  useEffect(() => {
    handleParameterChange()
  }, [limit]);

  // Debounce search city
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchCity(searchCity)
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchCity]);

  useEffect(() => {
    handleParameterChange()
  }, [debouncedSearchCity]);

  return (
    <div className="weather-app">
      <SearchInput 
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Enter city name. ex: London"
      />

      <div className='warmer-than-container'>
        <Slider
          label="Warmer than:"
          min={0}
          max={50}
          value={minTempFilter}
          onChange={(e) => setMinTempFilter(Number(e.target.value))}
        />
      </div>

      {(!weatherListFiltered || weatherListFiltered.length==0) && 
        <p className='no-data-container'>No data found. Please search different city or lessen warmer than filter.</p> 
      }
      {weatherListFiltered && weatherListFiltered.length>0 && weatherListFiltered.map(
        (weather, idx) => 
        <WeatherCard key={idx} weather={weather} />
      )}

      <Loading isLoading={loading} text='Loading...' />
      {error && <p className='error-container'>{error}</p>}

      {!loading && limit<MAX_DATA && <button className='show-more-button' onClick={handleShowMore}>Show More</button>}
    </div>
  );
};

export default WeatherApp;