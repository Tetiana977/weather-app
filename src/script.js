function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  //console.log(response.data);
  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  time.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
}

function submitForm(event) {
  event.preventDefault();
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let units = "metric";
  let userCity = document.querySelector("#user-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let formSearch = document.querySelector("#city-search");
formSearch.addEventListener("submit", submitForm);

//Display a temperature in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function changeCelsius(event) {
  event.preventDefault();
  celsiusElement.classList.remove("activ");
  fahrenheitElement.classList.add("activ");
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(temperature);
}

function changeFahrenheit(event) {
  event.preventDefault();
  fahrenheitElement.classList.remove("activ");
  celsiusElement.classList.add("activ");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", changeCelsius);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", changeFahrenheit);

// User`s current position

function getPosition(position) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showTemperature);
}

function getUserPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getUserPosition);
