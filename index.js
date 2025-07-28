const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const API_KEY = "b4adf7588fb066b166862f74c1cccfa2"; // Replace this with your API key

app.post("/webhook", async (req, res) => {
  const city = req.body.queryResult.parameters["geo-city"];
  let responseText = "I couldn't get the weather info.";

  if (city) {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = weatherResponse.data;
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      responseText = `The weather in ${city} is ${condition} with ${temp}°C.`;
    } catch (error) {
      responseText = `Sorry, I couldn't find the weather for ${city}.`;
    }
  } else {
    responseText = "Please provide a city.";
  }

  res.json({
    fulfillmentText: responseText,
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
