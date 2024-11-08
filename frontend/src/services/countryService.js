import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getAvailableCountries = async () => {
  const response = await axios.get(`${API_URL}/api/countries`);
  return response.data;
};

export const getCountryInfo = async (countryCode) => {
  const response = await axios.get(`${API_URL}/api/countries/${countryCode}`);
  return response.data;
};
