import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const targetTime = "00:00:00";
  const [filteredData, setFilteredData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [displayedData, setDisplayedData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=c0550cec049df62f5aca420354a6949e`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setLocation("");
        console.log(response.data);
        setFilteredData(
          response.data.list.filter((item) => item.dt_txt.endsWith(targetTime))
        );
        setDisplayedData({});
      });
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDisplayedData(filteredData.find((item) => item.dt_txt === date));
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="date">
            {Array.isArray(filteredData) &&
              filteredData.map((item, index) => (
                <button
                  key={index}
                  className="bold"
                  onClick={() => handleDateClick(item.dt_txt)}
                >
                  {item.dt_txt.substring(0, 10)}
                </button>
              ))}
          </div>

          <div className="location">
            <p>{data.city?.name}</p>
          </div>
          <div className="temp">
            {displayedData.main ? (
              <h1>{displayedData.main.temp.toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {displayedData.weather ? (
              <p>{displayedData.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        {displayedData.main !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>{displayedData.main?.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p>{displayedData.main?.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p>{displayedData.wind?.speed.toFixed()}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
