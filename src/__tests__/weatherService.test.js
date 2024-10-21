import nock from 'nock';
import { getWeatherData, getForecastData } from '../services/weatherService';

// Mock Data
const mockWeatherData = {
  version: "3.0",
  user: "na_weatherapi_haresh",
  dateGenerated: "2024-10-18T09:14:41Z",
  status: "OK",
  data: [
    {
      parameter: "t_2m:C",
      coordinates: [
        {
          lat: 51.51,
          lon: -0.13,
          dates: [
            {
              date: "2024-10-18T09:14:42Z",
              value: 10
            }
          ]
        }
      ]
    }
  ]
};

const mockForecastData = [
  { date: "2024-10-19T09:21:30Z", value: 14.7 },
  { date: "2024-10-20T09:21:30Z", value: 13.7 },
  { date: "2024-10-21T09:21:30Z", value: 14.3 },
  { date: "2024-10-22T09:21:30Z", value: 11.2 },
  { date: "2024-10-23T09:21:30Z", value: 12.5 }
];

describe('Weather Service Tests', () => {
  afterEach(() => {
    nock.cleanAll(); // Ensure nock is cleaned up after each test
  });

  it('should fetch current weather data', async () => {
    nock('https://api.meteomatics.com')
      .get('/2024-10-18T09:14:42Z/t_2m:C/51.51,-0.13/json')
      .reply(200, mockWeatherData);

    const lat = 51.51;
    const lon = -0.13;
    const result = await getWeatherData(lat, lon);

    expect(result).toEqual(mockWeatherData);
  });

  it('should fetch 5-day forecast data', async () => {
    nock('https://api.meteomatics.com')
      .get('/2024-10-19T09:21:30Z/t_2m:C/51.51,-0.13/json')
      .reply(200, mockForecastData);

    const lat = 51.51;
    const lon = -0.13;
    const result = await getForecastData(lat, lon);

    expect(result).toEqual(mockForecastData);
  });
});
