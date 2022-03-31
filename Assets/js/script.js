var weatherApiRoot = "https://api.openweathermap.org/data/2.5/";
var weatherApiKey = "fbe3e7f9934a462c71d1d1f7db8c90ed";

var searchBtnEl = document.getElementById("searchBtn");
var searchInputEl = document.getElementById("enterCity");
var searchFormEl = document.getElementById("searchForm");

function getWeather(lat, lon) {
  var weatherUrl = `${weatherApiRoot}onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
        
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
