let time = new Date();
let currentDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();
currentDate.innerHTML = ` ${day}, ${hour}:${minutes}`;

let cityInput = document.querySelector("#city-input");
let city = cityInput.value;
let apiKey = "fa8e748cbde4ed02a809ebf9c178a37b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);

function displayTemp(response) {
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;

  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${cityTemp} `;

  let humidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${wind} km/h`;

  let weatherDescription = response.data.weather[0].description;
  let displayDescription = document.querySelector("#day-description");
  displayDescription.innerHTML = weatherDescription;

  let minTemp = Math.round(response.data.main.temp_min);
  let displayMinTemp = document.querySelector("#min-temp");
  displayMinTemp.innerHTML = `Min. temp: ${minTemp}°C`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let displayMaxTemp = document.querySelector("#max-temp");
  displayMaxTemp.innerHTML = `Max. temp: ${maxTemp}°C`;
}

function search(event) {
  event.preventDefault(event);
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  let city = cityInput.value;
  currentCity.innerHTML = city;

  apiKey = "fa8e748cbde4ed02a809ebf9c178a37b";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "fa8e748cbde4ed02a809ebf9c178a37b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let locationButton = document.querySelector("#current-button");
locationButton.addEventListener("click", getCurrentLocation);
