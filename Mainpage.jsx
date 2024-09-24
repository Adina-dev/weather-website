import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {Link } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { app } from "../components/Functionality";

const Mainpage = () => {
  const [state, setState] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [Data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    fetchapi();
  }, [state, selectedCity]);

  const fetchapi = async () => {
    try {
      setLoading(true);
      const cityName = selectedCity || inputCity || state;
      if (cityName.trim() === "") {
        setLoading(false);
        return;
      }
      let data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4915d350df092a11f05bed5101cd1909`
      );
      setData(data.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  function kelvinToFahrenheitRounded(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  const wind = (wind) => {
    const windSpeed = Math.round(wind);
    return windSpeed;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchapi();
    }
  };

  const handleCitySelection = (city) => {
    setInputCity("");
    setSelectedCity(city);
  };

  const handleInputChange = (event) => {
    setInputCity(event.target.value);
    setSelectedCity("");
  };

  const getWeatherIcon = (getWeatherCondition) => {
    let selectedIcon;
    if (getWeatherCondition.includes("cloud")) {
      selectedIcon = "☁️";
    } else if (getWeatherCondition.includes("clear")) {
      selectedIcon = "🌙";
    } else if (getWeatherCondition.includes("mist")) {
      selectedIcon = "🌫️";
    } else if (getWeatherCondition.includes("rain")) {
      selectedIcon = "🌧️";
    } else if (getWeatherCondition.includes("haze")) {
      selectedIcon = "💨";
    } else if (getWeatherCondition.includes("smoke")) {
      selectedIcon = "💨";
    } else {
      selectedIcon = "⛅";
    }
    return selectedIcon;
  };

  const getWeatherCondition = () => {
    if (Data.weather && Data.weather.length > 0) {
      const mainWeather = Data.weather[0].main.toLowerCase();
      return mainWeather;
    }
    return "Unknown";
  };

  return (
    <div className="back-main">
      {currentUser === null ? (
        <div>
          <div className="container text-center">
            <div className="row align-items-center justify-content-center mt-5">
              <div className="col-lg-6 col-12 col-sm-10 col-md-10 mt-5 wlcm">
                <h1 className="fw-bold font1 text-light">WELCOME!</h1>
                <p className="fs-4 px-5 font1 text-light">
                  <span className="me-1 fs-1 text-light">
                    <i className="fa-solid fa-quote-left"></i>
                  </span>
                  Embark on a journey through the skies with SkySculpt, where
                  weather insights are not just predictions but gateways to
                  better planning and informed decisions. Your forecast, your
                  way.
                  <span className="ms-1 fs-1">
                    <i className="fa-solid fa-quote-right"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <h4 className="text-light">Welcome!</h4>
          <div className="row align-items-center justify-content-around">
            <div className="col-lg-6 mt-5">
              <div className="row align-items-center justify-content-around">
                <div className="col-lg-8 col-sm-8 col-md-8 col-8">
                  <input
                    onKeyDown={handleKeyDown}
                    value={inputCity}
                    onChange={handleInputChange}
                    className="rounded py-2 ps-3 w-100 me-lg-2 inpt shadow"
                    type="text"
                    placeholder="Enter your city name"
                  />
                </div>
                <div className="col-lg-3 col-sm-3 col-md-3 col-4">
                  <div className="dropdown-center">
                    <button
                      className="btn btn-secondary dropdown-toggle px-2 shadow"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedCity ? selectedCity : "Top Cities"}
                    </button>
                    <ul className="dropdown-menu transparent">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Lahore")}
                        >
                          Lahore
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Karachi")}
                        >
                          Karachi
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Islamabad")}
                        >
                          Islamabad
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Peshawar")}
                        >
                          Peshawar
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Faisalabad")}
                        >
                          Faisalabad
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Quetta")}
                        >
                          Quetta
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Murree")}
                        >
                          Murree
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Bahawalpur")}
                        >
                          Bahawalpur
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Gilgit")}
                        >
                          Gilgit
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("Rahimyar Khan")}
                        >
                          Rahimyar Khan
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleCitySelection("")}
                        >
                          none
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {Data.name && (
              <>
                <div className="row justify-content-around align-item-center mt-4">
                  <div className="col-lg-7 col-sm-12 col-12 py-4 transparent px-4 rounded">
                    <div className="row align-item-center justify-content-evenly">
                      <div className="col-lg-3 col-sm-3 col-6 pt-3">
                        <h1 className="text-light">{Data.name}</h1>
                        <p className="text-light"> {Data.sys.country}</p>
                      </div>
                      <div className="col-lg-3 col-sm-3 col-6">
                        {Data.weather && Data.weather.length > 0 && (
                          <>
                            <span className="text-white fw-normal fs-3">
                              {Data.weather[0].main} <br />
                            </span>
                            <span
                              className="display-4"
                              role="img"
                              aria-label="Weather Icon"
                            >
                              {getWeatherIcon(getWeatherCondition())}
                            </span>
                          </>
                        )}
                      </div>
                      {loading && (
                        <div className="d-flex justify-content-center mt-2 text-light">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" row d-flex mt-4 justify-content-around align-item-center ">
                      {Data.main && (
                        <>
                          <div className=" col-lg-2 col-sm-4 col-md-4 col-4 py-4 rounded text-center  text-light">
                            <h6 className="text-light">
                              Temperature:
                              <br />{" "}
                              {kelvinToFahrenheitRounded(Data.main.temp) + "°C"}
                            </h6>
                          </div>
                          <div className=" col-lg-2 col-sm-4 col-md-4 col-4 py-4 rounded text-center  text-light">
                            <h6 className="text-light">
                              {Data.weather && Data.weather.length > 0 && (
                                <>
                                  About: <br />
                                  {Data.weather[0].description}
                                </>
                              )}
                            </h6>
                          </div>
                          <div className="col-lg-2 col-sm-4 col-md-4 col-4 rounded py-4 text-center text-light ">
                            <h6>
                              Clouds: <br /> {Data.clouds.all + "%"}
                            </h6>
                          </div>
                          <div className="col-lg-2 col-sm-4 col-md-4 col-4  py-4 rounded text-center text-light ">
                            {""}
                            <h6>
                              Feels Like: <br />{" "}
                              {kelvinToFahrenheitRounded(Data.main.feels_like) +
                                "°C"}
                            </h6>
                          </div>
                          <div className="col-lg-2 col-sm-4 col-md-4 col-4 rounded py-4 text-center text-light ">
                            <h6>
                              Wind: <br /> {wind(Data.wind.speed) + "m/s"}
                            </h6>
                          </div>
                          <div className="col-lg-2 col-sm-4 col-md-4 col-4 rounded py-4 text-center text-light ">
                            <h6>
                              Humidity: <br /> {Data.main.humidity + "%"}
                            </h6>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <footer className="foot">
        <div>
          <span className="fw-semibold ms-5 text-dark ">
            Created by Adina Abid
          </span>
          <span className="fs-3 ms-2 text-dark">|</span>
          <span className="ms-2 text-dark">
            <i className="bi bi-c-circle me-1"></i>
            2024 —
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Mainpage;
