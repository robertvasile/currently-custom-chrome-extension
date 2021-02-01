let OPEN_WEATHER_KEY = "beac7c40c6ebee3f7f54a7a3544c9986";
// Initialize needed variables
let mainContainer = document.querySelector(".main-container");
let buttonContainer = document.querySelector(".button-container");
let menu = document.querySelector(".menu");
let menuButton = document.querySelectorAll(".bar");
let clock = document.querySelector(".clock");
let weatherButton = document.querySelector(".weather-button")
let mainWeather = document.querySelector(".main__weather");
let searchButton = document.querySelector(".searchbar__button");

window.addEventListener("load", function () {
    let themeSetting;
    let date = new Date();
    let todaysDate = date.getDate();

    // Get time
    function updateTime() {
        let timeDate = new Date();
        let currentTime = timeDate;
        let hours = date.getHours();
        let suffix = hours >= 12 ? "PM" : "AM";
        hours = ((hours + 11) % 12 + 1);
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let timeString = hours + ":" + minutes + ":" + seconds + " " + suffix;

        clock.innerHTML = timeString;
    }

    setInterval(updateTime, 1000);

    // Check for a theme in local storage, if it's not there set a default.
    if (localStorage.getItem("theme") !== null) {
        this.dispatchEvent(themeChangeEvent);
    } else {
        themeSetting = "light";
        localStorage.setItem("theme", "light");
        localStorage.setItem("backgroundColor", "#e5e5e5");
        localStorage.setItem("fontColor", "#222");
        this.dispatchEvent(themeChangeEvent);
        console.log("Set theme to light.");
    }

    document.getElementById("openSideNav").addEventListener("click", openNav);

    function openNav() {
        document.getElementById("mySidenav").style.width = "66%"; // slide box open 2/3rd of screen
        document.querySelector(".nav_header_section").style.display = "block"; // show nav haedaer content
        document.querySelector("#nav_loadInfo_con").style.display = "block"; // show nav body content
        loadThemesPage(); // load themes content by defult
        //checkCurrentThemeInfo();
    }
    document.getElementById("closeSideNav").addEventListener("click", () => {
        resetTheme();
        closeNav();
    });

    function resetTheme() {
        let resetEvent = new Event("Theme Changed");
        this.dispatchEvent(resetEvent);
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0"; // close nave box
        document.querySelector(".nav_header_section").style.display = "none"; // hide nav haedaer content
        document.querySelector("#nav_loadInfo_con").style.display = "none"; // hide nav body content
    }

    function loadThemesPage() {
        document.querySelector('#nav_themes').classList.add("active");
        checkCurrentThemeInfo();
    }

    function checkCurrentThemeInfo() {
        document.querySelector('.classic').classList.add("active");
    }

    checkIfWeatherIsStored();

    function checkIfWeatherIsStored() {
        if (localStorage.getItem("wdataforecast") && localStorage.getItem("wdataforecast") !== "{}" && todaysDate == parseInt(localStorage.getItem("lastupdate"))) {
            let weatherForecastData = JSON.parse(localStorage.getItem("wdataforecast"));
            buildForecast(weatherForecastData);
            weatherButton.classList.add("hidden");
            mainWeather.classList.toggle("hidden");
        }
        else if (localStorage.getItem("geolocation")) {
            localStorage.setItem("lastupdate", todaysDate);
            let geostorage = JSON.parse(localStorage.getItem("geolocation"));
            apiCall(geostorage.lat, geostorage.lng)
            weatherButton.classList.add("hidden");
            mainWeather.classList.toggle("hidden");
        }
    }

    if (!localStorage.getItem("geolocation")) {
        weatherButton.addEventListener("click", () => {
            getLocation();
        })
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        }
        else {
            // Geolocation Not Supported
        }
    }

    function error() {
        //Unable to retrieve position
    }

    // Requires permission 'geolocation' in manifest
    function success(position) {
        let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        //set the geolocation so we don't query it frequently
        localStorage.setItem("geolocation", JSON.stringify(location));

        //Utilize API to grab weather and display.
        if (localStorage.getItem("wdataforecast") && localStorage.getItem("wdataforecast") !== "{}" && todaysDate == parseInt(localStorage.getItem("lastupdate"))) {
            let weatherForecastData = JSON.parse(localStorage.getItem("wdataforecast"));
            buildForecast(weatherForecastData);
            weatherButton.classList.add("hidden");
            mainWeather.classList.toggle("hidden");
        }
        else {
            localStorage.setItem("lastupdate", todaysDate);
            apiCall(location.lat, location.lng)
            weatherButton.classList.add("hidden");
            mainWeather.classList.toggle("hidden");
        }
    }

    async function apiCall(lat, lng) {
        return await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=5&appid=${OPEN_WEATHER_KEY}&type=accurate&units=metric`)
            .then(res => res.json().then(data => {
                localStorage.setItem("wdataforecast", JSON.stringify(data.list));
                buildForecast(data.list);
            }));
    }

    function buildForecast(data) {
        const forecast = document.getElementsByClassName('forecast__day');
        for (let i = 0; i < forecast.length; i++) {
            data[i].weather[0].id && forecast[i].querySelector(".wi").classList.add("wi-owm-" + data[i].weather[0].id)
            let temp = forecast[i].querySelector(".forecast__temp")
                , currentTemp = document.querySelector(".main__current-temp")
                , minTemp = temp.querySelector(".temp__min")
                , maxTemp = temp.querySelector(".temp__max");
            minTemp.innerHTML = Math.round(data[i].temp.min) + '&deg;C';
            maxTemp.innerHTML = Math.round(data[i].temp.max) + '&deg;C';
            forecast[i].querySelector(".forecast__Weather").innerHTML = data[i].weather[0].main;
            forecast[i].querySelector(".forecast__nameOfDay").innerHTML = DateFormatter(data[i].dt);
        }
    }

    function DateFormatter(date) {
        let myDate = new Date(date * 1000), dateString = "";
        return dateString = myDate.toDateString() == (new Date).toDateString() ? "Today" : myDate.toLocaleDateString(void 0, { weekday: 'long' })
    }


    this.addEventListener(("Save"), closeNav);

});

this.addEventListener(("Theme Changed"), () => {
    let backgroundColor = localStorage.getItem("backgroundColor");
    let fontColor = localStorage.getItem("fontColor");
    if (backgroundColor && fontColor) {
        searchButton.style.backgroundColor = backgroundColor;
        searchButton.style.color = fontColor;
        mainContainer.style.backgroundColor = backgroundColor;
        mainContainer.style.color = fontColor;
        for (i = 0; i < menuButton.length; i++) {
            menuButton[i].style.backgroundColor = fontColor;
        }
    }
});