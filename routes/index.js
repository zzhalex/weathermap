var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
  res.sendFile("index.html");
});

async function getCurWeather() {
  let url = "http://api.openweathermap.org/data/2.5/weather";
  let city = "vancouver";
  let appid = process.env.weatherApi;
  try {
    const response = await axios.get(url, {
      params: {
        q: city,
        appid: appid,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

router.get("/weather", async function (req, res, next) {
  let data = await getCurWeather();
  res.send(data);
});
module.exports = router;
