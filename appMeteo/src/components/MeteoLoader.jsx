import React, { useEffect, useState } from "react";
import loader from "../assets/loader.svg";
import Browser from "../assets/browser.svg";
import "./MeteoLoaderCss.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function meteoLoader() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => {
        // console.log(response);
        // 400 - 499: client error
        // 500 - 599: server error
        if (!response.ok) {
          throw new Error(
            `Something went wrong : Error ${response.status}, ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        // console.log(responseData);
        setWeatherData({
          city: responseData.data.city,
          country: responseData.data.country,
          temperature: responseData.data.current.weather.tp,
          iconId: responseData.data.current.weather.ic,
        });
      })
      .catch((error) => {
        // console.log(error);
        // console.dir(error);
        setErrorInfo(error.message);
      });
  }, []);
  return (
    <>
      <div
        className={`loader-container ${!weatherData && !errorInfo && "active"}`}
      >
        <img src={loader} alt="loading icon" />
      </div>
      {weatherData && (
        <>
          <p className="city-name"> {weatherData.city} </p>
          <p className="conutry-name">{weatherData.country} </p>
          <p className="temperature">{weatherData.temperature}°C </p>
          <div className="info-icon-container">
            <img
              className="info-icon"
              src={`/icons/${weatherData.iconId}.svg`}
              alt="weather icon"
            />
          </div>
        </>
      )}

      {errorInfo && !weatherData && (
        <>
          <p className="error-info">{errorInfo}</p>
          <img src={Browser} alt="error icon" />
        </>
      )}
    </>
  );
}

export default meteoLoader;
