const axios = require("axios");
const appid = process.env.weatherApi;

const currentData = (data) => {
  let odata = {
    temp: parseFloat(data.main.temp - 273.15).toFixed(2), // Convert Kelvin to Celsius
    name: data.name,
    icon: data.weather[0].icon,
    weather: data.weather[0].description,
  };
  return odata;
};

const convertUnixToDate = (unix) => {
  let time = new Date(unix * 1000);
  return time.getMonth() + 1 + "-" + time.getDate();
};

const forecastData = (data) => {
  let odata = {
    list: data.daily.map((n, i) => {
      return {
        key: i,
        temp: parseFloat(n.temp.day - 273.15).toFixed(2),
        weather: n.weather[0].description,
        icon: n.weather[0].icon,
        date: convertUnixToDate(n.dt),
      };
    }),
  };
  return odata;
};

async function getDayForecast(lon, lat) {
  let url = "https://api.openweathermap.org/data/2.5/onecall";

  try {
    const response = await axios.get(url, {
      params: {
        lat: lat,
        lon: lon,
        //part: "current,minutely,hourly",
        appid: appid,
      },
    });
    console.log(response.data);
    return forecastData(response.data);
  } catch (error) {
    throw error;
  }
}

async function getWeather(city) {
  console.log(city);
  let url = "http://api.openweathermap.org/data/2.5/weather";
  console.log(city);
  try {
    const response = await axios.get(url, {
      params: {
        q: city,
        appid: appid,
      },
    });

    let { lat, lon } = response.data.coord;
    console.log(lat, lon);
    let forecastData = await getDayForecast(lon, lat);

    let odata = currentData(response.data);
    odata.forecastData = forecastData;
    return odata;
  } catch (error) {
    throw error;
  }
}
module.exports.getWeather = getWeather;
