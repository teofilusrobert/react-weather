import axios from 'axios'
const BASE_URL = 'https://freetestapi.com/api/v1/weathers';

export const fetchWeather = async (limit: number, search: string) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
          params: {
            limit,
            search: search || ''
          },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching weather data:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}