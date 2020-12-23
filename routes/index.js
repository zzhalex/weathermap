var express = require("express");
var router = express.Router();
const { getWeather } = require("../weather/weatherFunc");

router.get("/", function (req, res) {
  console.log("INDEX");
  res.sendFile("zz.html");
});

router.get("/weather", async function (req, res, next) {
  console.log("api weather");
  try {
    let data = await getWeather(req.query.city);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/defweather", async function (req, res, next) {
  console.log("api default");
  try {
    let van = await getWeather("Vancouver");
    let london = await getWeather("London");
    let ny = await getWeather("new york");
    let seattle = await getWeather("seattle");
    res.send([van, london, ny, seattle]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
