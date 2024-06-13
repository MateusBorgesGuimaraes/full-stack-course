import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";
const baseUrlWeather = "http://api.openweathermap.org/data/2.5/weather?";
const api_key = process.env.REACT_APP_API_KEY;

export const getAllCountries = () => {
  return axios.get(baseUrl);
};

export const getWheather = (city) => {
  return axios.get(`${baseUrlWeather}appid=${api_key}&q=${city}`);
};
