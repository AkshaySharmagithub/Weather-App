document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessageDisplay = document.getElementById("error-message");
    const humidityDisplay = document.getElementById("humidity");
    const windSpeedDisplay = document.getElementById("wind-speed");

    const API_KEY = "d4c0aed04d5499ba0b246ff87746d421";

    getWeatherBtn.addEventListener('click', async () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;

        try {
            const weatherData = await fetchWeatherData(cityName);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error("Error:", error.message);
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        console.log("Fetching:", url);

        const response = await fetch(url);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'City Not Found');
        }

        return await response.json();
    }

    function displayWeatherInfo(data) {
        const { name, main, weather, wind, humidity } = data;
        cityNameDisplay.textContent = `${name}`;
        temperatureDisplay.textContent = ` Temperature: ${main.temp}`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
        humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
        windSpeedDisplay.textContent = `Wind Speed: ${data.wind.speed} m/s`;



        weatherInfo.classList.remove("hidden");
        errorMessageDisplay.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessageDisplay.classList.remove("hidden");
    }
});
