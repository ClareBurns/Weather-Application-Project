//function: organises time of Last Update
function generateTime(currentTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentTime.getDay()];
  let currentHours = currentTime.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let timeUpdate = `Last Update: ${currentDay} ${currentHours}:${currentMinutes}`;
  return timeUpdate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div weather-forecast-date>${formatDay(forecastDay.dt)}</div>
              <div id="icon">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  class="weather-forecast-icon"
                />
              </div>
              <span class="future-max"> ${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="future-min"> ${Math.round(
                forecastDay.temp.min
              )}°</span>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let tempUnits = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${tempUnits}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//function: gives all the weather condition information
function displayWeatherCondition(response) {
  let cityText = document.querySelector("#entered-city");
  cityText.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let currentTemperature = Math.round(celsiusTemperature);
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = `${currentTemperature}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  wind = Math.round(wind * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}km/h`;
  let weatherDescription = response.data.weather[0].description;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;

  let weathericon = document.querySelector("#weather-icon");
  weathericon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weathericon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//function: searches the city that has been inputted
function changeCity(city) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let tempUnits = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${tempUnits}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//function: runs Change city when search is submitted
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  changeCity(cityInput);
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("non-active");
  celsiusLink.classList.remove("non-active");
  celsiusLink.classList.add("active");
}

//function: gets the information for current location and runs apiUrl
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let tempUnits = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${tempUnits}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//function: outputs current location data
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//function: converts celcius temperature to fahrenheit
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  celsiusLink.classList.remove("active");
  celsiusLink.classList.add("non-active");
  fahrenheitLink.classList.remove("non-active");
  fahrenheitLink.classList.add("active");
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//function: converts fahrenheit temperature back to celsius
function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("non-active");
  celsiusLink.classList.remove("non-active");
  celsiusLink.classList.add("active");
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//changing the time of the last update
let lastUpdate = document.querySelector("#last-update");
let currentTime = new Date();
lastUpdate.innerHTML = generateTime(currentTime);

//runs change city when the form is submitted
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

//runs function when current location button is clicked
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

//declares global variable
let celsiusTemperature = null;

//runs temperature conversion when F is clicked
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

//runs temperature conversion when C is clicked
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

//sydney as default city
changeCity("Sydney");
