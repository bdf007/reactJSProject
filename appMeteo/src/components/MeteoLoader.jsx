import React from "react";
import loader from "../assets/loader.svg";

function meteoLoader() {
  return (
    <>
      <div className="loader-container">
        <img src={loader} alt="loading icon" />
      </div>
      <p className="city-name">Paris</p>
      <p className="conutry-name">France</p>
      <p className="temprature">17°C</p>
      <div className="info-icon-container">
        <img src="/icons/01d.svg" alt="weather icon" />
      </div>
    </>
  );
}

export default meteoLoader;
