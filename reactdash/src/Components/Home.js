import React, { useRef } from "react";
import axios from "axios";

function Home() {
  const inputEl = useRef(null);
  const cityQuery = () => {
    let city = inputEl.current.value;
    axios
      .get("/weather", {
        params: {
          city: city,
        },
      })
      .then(function (res) {
        console.log(res);
      });
  };
  return (
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
  );
}

export default Home;
