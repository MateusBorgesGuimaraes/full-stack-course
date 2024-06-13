import React from "react";
import { getWheather } from "../Services/countries";

const Weather = ({ capital }) => {
  const [weather, setWeather] = React.useState([]);

  React.useEffect(() => {
    getWheather(capital).then((response) => {
      setWeather(response.data);
    });
  }, [capital]);

  if (!weather || !weather.main || !weather.weather || !weather.wind) {
    return <div>Loading weather data...</div>;
  }

  const celcius = weather.main.temp - 273.15;
  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>temperature: {celcius.toFixed(2)} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
