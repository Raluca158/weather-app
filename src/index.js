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





function displayForecast (response) {
  console.log(response.data.daily);
  let forecastElement= document.querySelector("#forecast");
  let days = ["Thursday", "Friday", "Saturday", " Sunday", "Monday"];
  let forecastHTML = `<div class = "col-5">`;

  days.forEach(function (day) {
  forecastHTML = forecastHTML + 
  `
  <div class="card text-center" style="width: 15rem;">
  <div class="card-body">
    <h5 class="card-title">${day}</h5>
    <p class="card-text">16°C ⛅</p>
  </div>
  </div>
  `;
 });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}
function getForecast(coordinates) {
  let apiKey = "fa8e748cbde4ed02a809ebf9c178a37b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;

  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${cityTemp} `;
  celsiusTemp = response.data.main.temp;

  let humidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${wind} km/h`;

  let weatherDescription = response.data.weather[0].description;
  let displayDescription = document.querySelector("#day-description");
  displayDescription.innerHTML = weatherDescription;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let minTemp = Math.round(response.data.main.temp_min);
  let displayMinTemp = document.querySelector("#min-temp");
  displayMinTemp.innerHTML = `Min. temp: ${minTemp}°C`;
  

  let maxTemp = Math.round(response.data.main.temp_max);
  let displayMaxTemp = document.querySelector("#max-temp");
  displayMaxTemp.innerHTML = `Max. temp: ${maxTemp}°C`;  

  getForecast(response.data.coord);
}


function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  let city = cityInput.value;
  currentCity.innerHTML = city;

  searchCity(city); 
}

  function searchCity(city) {

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

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}


let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", displayCelsius);

searchCity("Amsterdam");
