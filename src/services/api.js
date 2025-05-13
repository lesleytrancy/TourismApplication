// API base URL - should be configured based on environment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// API endpoints
const ENDPOINTS = {
  WEATHER: '/weather',
  HOTELS: '/hotels',
  CURRENCY: '/currency/convert',
};

// Helper function for making API requests
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Weather API Service
export const weatherService = {
  getWeather: async (location) => {
    return fetchAPI(`${ENDPOINTS.WEATHER}?location=${encodeURIComponent(location)}`);
  },
};

// Hotel API Service
export const hotelService = {
  searchHotels: async (params) => {
    const queryParams = new URLSearchParams({
      location: params.location,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: params.guests,
    });
    return fetchAPI(`${ENDPOINTS.HOTELS}?${queryParams}`);
  },
};

// Currency API Service
export const currencyService = {
  convertCurrency: async (from, to, amount) => {
    const queryParams = new URLSearchParams({
      from,
      to,
      amount,
    });
    return fetchAPI(`${ENDPOINTS.CURRENCY}?${queryParams}`);
  },
};

// Example usage in components:
/*
import { weatherService, hotelService, currencyService } from '../services/api';

// In your component:
const fetchWeather = async () => {
  try {
    const weatherData = await weatherService.getWeather('Sydney');
    // Handle the weather data
  } catch (error) {
    // Handle error
  }
};

const searchHotels = async () => {
  try {
    const hotels = await hotelService.searchHotels({
      location: 'Sydney',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      guests: 2,
    });
    // Handle the hotels data
  } catch (error) {
    // Handle error
  }
};

const convertCurrency = async () => {
  try {
    const result = await currencyService.convertCurrency('USD', 'EUR', 100);
    // Handle the conversion result
  } catch (error) {
    // Handle error
  }
};
*/ 