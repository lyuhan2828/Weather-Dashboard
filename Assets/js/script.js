var weatherApiRoot = "https://api.openweathermap.org/data/2.5/";
var weatherApiKey = "fbe3e7f9934a462c71d1d1f7db8c90ed";

var searchBtnEl = document.getElementById("searchBtn");
var searchInputEl = document.getElementById("enterCity");
var searchFormEl = document.getElementById("searchForm");
var fiveDayEl = document.getElementById("fiveDay");

function getWeather(lat, lon) {
  var weatherUrl = `${weatherApiRoot}onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var temptext = document.getElementById("current-temp");
      temptext.innerHTML = data.current.temp - 273;
      var windtext = document.getElementById("current-wind");
      windtext.innerHTML = data.current.wind_speed;
      var humidtext = document.getElementById("current-humid");
      humidtext.innerHTML = data.current.humidity;
      var UVtext = document.getElementById("current-UV");
      UVtext.innerHTML = data.current.uvi;
      console.log(data);

      for (var i = 0; i < 5; i++) {
        fiveDayEl.innerHTML += `
  <div class="col current-info">
              <div class="weather-item">
                Temp
                <p>${data.daily[i].temp.day - 273}</p>
              </div>
              <div class="weather-item">
                Wind
                <p>${data.daily[i].wind_speed}</p>
              </div>
              <div class="weather-item">
                Humidity
                <p>${data.daily[i].humidity}</p>
              </div>
            </div>
  `;
      }
    });
}

function getCoordinates(search) {
  var coordsUrl = `${weatherApiRoot}weather?q=${search}&appid=${weatherApiKey}`;
  console.log(coordsUrl);
  fetch(coordsUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      getWeather(lat, lon);
    });
}

function handleFormSubmit(e) {
  if (!searchInputEl) {
    return;
  }
  e.preventDefault();
  var search = searchInputEl.value.trim();
  console.log(search);
  getCoordinates(search);

  searchInputEl.value = "";
}
searchFormEl.addEventListener("submit", handleFormSubmit);
