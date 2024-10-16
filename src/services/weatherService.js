import axios from 'axios';

const USERNAME = "na_weatherapi_haresh";
const PASSWORD = "VTRefy47J8";
const BASE_URL = "https://api.meteomatics.com";

export const getWeatherData = async (lat, lon) => {
    const now = new Date().toISOString();

    try {
        const response = await axios.get(`${BASE_URL}/${now}/t_2m:C/${lat},${lon}/json`, {
            auth: {
                username: USERNAME,
                password: PASSWORD
            }
        });

        return response.data;
    } catch(error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export const getForecastData = async (lat, lon) => {
    const now = new Date().toISOString();
    const endDate = new Date(Date.now() + 5 * 24 * 60 * 60 *1000).toISOString(); //5 days from today

    try {
        const response = await axios.get(`${BASE_URL}/${now}--${endDate}:PT12H/t_2m:C/${lat},${lon}/json`, {
            auth: {
                username: USERNAME,
                password: PASSWORD
            }
        });
        return response.data;

    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
}