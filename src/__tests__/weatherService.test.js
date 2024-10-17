import { getWeatherData } from '../services/weatherService';
import axios from 'axios';

// Mock axios to avoid actual API calls during tests
jest.mock('axios');

describe('weatherService', () => {
  it('should fetch weather data successfully', async () => {
    console.log('Test 1: Fetch weather data successfully');

    const mockResponse = {
      data: {
        data: [{ coordinates: [{ dates: [{ value: 22 }] }] }],
      },
    };
    
    // Mock axios GET request to return mock data
    axios.get.mockResolvedValue(mockResponse);

    const lat = 51.51;
    const lon = -0.13;

    console.log('Before calling getWeatherData');
    const result = await getWeatherData(lat, lon);
    console.log('After calling getWeatherData', result);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.meteomatics.com/${new Date().toISOString()}/t_2m:C/${lat},${lon}/json`,
      expect.any(Object)
    );

    console.log('Test 1 passed: Weather data successfully fetched');
  });

  it('should handle error if fetch fails', async () => {
    console.log('Test 2: Handle error if fetch fails');

    // Simulating an error response
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));

    const lat = 51.5074;
    const lon = -0.1278;

    console.log('Before calling getWeatherData (simulating error)');
    try {
      await getWeatherData(lat, lon);
    } catch (e) {
      console.log('Error caught:', e);
      expect(e).toEqual(new Error('Failed to fetch data'));
    }

    console.log('Test 2 passed: Error handling works correctly');
  });
});

