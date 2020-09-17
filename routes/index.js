var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
  res.sendFile("index.html");
});

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
    return response.data;
  } catch (error) {
    throw error;
    //console.error(error);
  }
}

router.get("/weather", async function (req, res, next) {
  console.log("api weather");
  //console.log(req.query);
  let data = await getCurWeather(req.query.city);
  res.send(data);
});
module.exports = router;
