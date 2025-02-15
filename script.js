const weatherApiKey = '6ab21eb33c0b64ed05a70d71feb21069';

async function fetchWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
  try {
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();

    // Check if the city is not found
    if (weatherData.cod !== 200) {
      throw new Error(weatherData.message);
    }

    const weatherHTML = `
      <p><strong>City:</strong> ${weatherData.name}</p>
      <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
      <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
    `;
    document.querySelector('.weather-info').innerHTML = weatherHTML;
  } catch (error) {
    document.querySelector('.weather-info').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

document.getElementById('searchButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    document.querySelector('.weather-info').innerHTML = '<p style="color:red;">Please enter a valid city name.</p>';
  }
});
