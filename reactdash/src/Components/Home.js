import React, { useRef, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import WeatherTable from "./WeatherTable";
import SubChart from "./SubChart";

function Home() {
  const inputEl = useRef(null);
  const [card, setCard] = useState(null);
  const [table, setTable] = useState(null);
  const cityQuery = () => {
    let city = inputEl.current.value;
    axios
      .get("/weather", {
        params: {
          city: city,
        },
      })
      .then(function (res) {
        console.log(res.data);
        setCard(res.data);
        setTable(res.data.forecastData.list);
      });
  };
  return (
    <React.Fragment>
      <div className="searchBar">
        <div className="search-input-container">
          <input
            className="search-input"
            ref={inputEl}
            type="search"
            placeholder="Search..."
          />
          <span className="material-icons" onClick={cityQuery}>
            search
          </span>
        </div>
      </div>
      <div className="homeBody">
        <div className="homeCard">
          {" "}
          <WeatherCard props={card} />
        </div>
        <div className="homeTable">
          {" "}
          <WeatherTable props={table} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
