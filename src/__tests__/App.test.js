import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock fetchWeatherData function
jest.mock('../services/weatherService', () => ({
  getWeatherData: jest.fn(),
  getForecastData: jest.fn(),
}));

describe('App Component', () => {
  it('should render the weather search input and button', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter a city');
    const button = screen.getByText('Search');
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should show error if city not found', async () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter a city'), {
      target: { value: 'Fake City' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('City not found.')).toBeInTheDocument();
    });
  });

  it('should fetch weather data when a valid city is entered', async () => {
    // Simulating a successful weather fetch response
    const mockWeather = { data: [{ coordinates: [{ dates: [{ value: 22 }] }] }] };
    const { getWeatherData, getForecastData } = require('../services/weatherService');
    getWeatherData.mockResolvedValue(mockWeather);

    render(<App />);

    // Enter a valid city name
    fireEvent.change(screen.getByPlaceholderText('Enter a city'), {
      target: { value: 'London' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Temperature: 22°C')).toBeInTheDocument();
    });
  });
});
