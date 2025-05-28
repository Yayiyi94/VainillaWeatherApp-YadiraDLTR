function refreshWeather(response) {
  let tempeElement = document.querySelector("#weather-app-temperature");
  tempeElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;

  let descripElement = document.querySelector("#weather-description");
  descripElement.innerHTML = response.data.condition.description;

  let humiElement = document.querySelector("#humidity-percent");
  humiElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = response.data.wind.speed;

  let date = new Date(response.data.time * 1000);

  let timeElement = document.querySelector("#date");
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#weather-icon");
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class= "weather-app-temperature-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "10fa90a2o832483bf734tfe8a27fcdad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

function changeTheme() {
  let body = document.querySelector("body");

  body.classList.toggle("dark");
}

let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

searchCity("Mexico City");

function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-days">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon">☀️</div>
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">15°</div>
        <div class="weather-forecast-temperature">9°</div>
      </div>
    </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
