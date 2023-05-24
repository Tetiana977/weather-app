//display the current date and time

function formatTime(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
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
  let currentDay = days[date.getDay()];

  return `${currentDay} ${currentHour}:${currentMinute}`;
}

let currentDate = document.querySelector("#time");
let currentTime = new Date();

currentDate.innerHTML = formatTime(currentTime);

//display the city name and temperature on the page after the user submits the form

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function submitForm(event) {
  event.preventDefault();
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let units = "metric";
  let city = document.querySelector("#user-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let formSearch = document.querySelector("#city-search");
formSearch.addEventListener("submit", submitForm);

//Bonus Feature/w4
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function changeCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeCelsius);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeFahrenheit);

//Bonus Feature/w5

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
