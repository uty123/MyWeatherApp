let now = new Date();
let specificList = document.querySelector(".current-date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minuites = now.getMinutes();
if (minuites < 10) {
  minuites = `0${minuites}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
specificList.innerHTML = `${day} ${hours}:${minuites}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}
//the goal of this new function is th search for the weather for a specific city. so it is going to make an api call for a city.

function searchCity(city) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-text-input");
  let city = cityInput.value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");

currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");
