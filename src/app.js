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
  let temperatureMaxToday = Math.round(response.data.main.temp_max);
  let temperatureMaxTodayElement = document.querySelector(
    "#temperature-max-today"
  );
  temperatureMaxTodayElement.innerHTML = `${temperatureMaxToday}°`;
  let temperatureMinToday = Math.round(response.data.main.temp_min);
  let temperatureMinTodayElement = document.querySelector(
    "#temperature-min-today"
  );
  temperatureMinTodayElement.innerHTML = `${temperatureMinToday}°`;
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
  fahrenheitLink.classList.add("active");
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//function: converts fahrenheit temperature back to celsius
function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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

//old code on changing temperature units
/*
function temperatureCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 19;
}

function temperatureFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 66;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", temperatureCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", temperatureFahrenheit);
*/

//old code on displaying weather
/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city?");
city = city.toLowerCase();
city = city.trim();

if (weather[city] !== undefined) {
  let tempC = weather[city].temp;
  let tempF = [];
  let humidity = weather[city].humidity;
  function changeTempUnits() {
    tempF = tempC * (9 / 5) + 32;
  }
  changeTempUnits();
  tempC = Math.round(tempC);
  tempF = Math.round(tempF);
  alert(
    `It is currently in ${tempC}℃ (${tempF}℉) ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
} */
