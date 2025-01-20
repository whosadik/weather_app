const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const CAT_FACT_API_URL = process.env.CAT_FACT_API_URL;

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Ошибка получения данных о погоде.");
  }
});

app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/map", async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
      {
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Ошибка получения данных карты.");
  }
});

app.get("/random", async (req, res) => {
  try {
    const response = await axios.get(CAT_FACT_API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Ошибка получения случайного факта.");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
