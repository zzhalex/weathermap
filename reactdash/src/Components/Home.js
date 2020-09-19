import React, { useRef, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
function Home() {
  const inputEl = useRef(null);
  const [card, setCard] = useState(null);
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
        <WeatherCard props={card} />
      </div>
    </React.Fragment>
  );
}

export default Home;
