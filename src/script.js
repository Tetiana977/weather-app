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

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let week = response.data.daily;
  console.log(week);
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  week.forEach(function (weekDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="week-day">
            ${formatWeekDay(weekDay.dt)} 
          </div>
          <div class="month">
            May 21
          </div>
          <div class forecast-temperature>
            <span class="temperature-max">${Math.round(
              weekDay.temp.max
            )}°</span>
            <span class="temperature-min">${Math.round(
              weekDay.temp.min
            )}°</span>
          </div>
          <div class="emoji">
            <img src="https://openweathermap.org/img/wn/${
              weekDay.weather[0].icon
            }@2x.png" alt="" width="42" /></h2> 
          </div>
        </div>
      `;
    };  
  });
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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
