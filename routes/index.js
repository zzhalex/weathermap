var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
  res.sendFile("index.html");
});

const filterData = (data) => {
  let odata = {
    temp: data.main.temp,
    name: data.name,
    icon: data.weather[0].icon,
    weather: data.weather[0].description,
  };
  return odata;
};

async function getCurWeather(city) {
  let url = "http://api.openweathermap.org/data/2.5/weather";
  let appid = process.env.weatherApi;
  console.log(city);
  try {
    const response = await axios.get(url, {
      params: {
        q: city,
        appid: appid,
      },
    });
    //console.log(response);
    return filterData(response.data);
  } catch (error) {
    throw error;
  }
}

router.get("/weather", async function (req, res, next) {
  console.log("api weather");
  try {
    let data = await getCurWeather(req.query.city);
    res.send(data);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
