const apiKey = "9c8e50c77b55061cb811b30fe8aa3f59";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherContainer = document.querySelector(".weather");
    const errorContainer = document.querySelector(".error");

    async function weatherChecker(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            errorContainer.style.display = "block";
            weatherContainer.style.display = "none";
        } else {
            const data = await response.json();
            

            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temperature").textContent = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + "km/h";

            const weatherIconContainer = document.querySelector(".weather-icon");

            if (data.weather[0].main == "Clouds") {
                weatherIconContainer.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            } else if (data.weather[0].main == "Clear") {
                weatherIconContainer.innerHTML = '<i class="fa-regular fa-sun"></i>';
            } else if (data.weather[0].main == "Rain") {
                weatherIconContainer.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
            } else if (data.weather[0].main == "Drizzle") {
                weatherIconContainer.innerHTML = '<i class="fa-solid fa-umbrella"></i>';
            } else if (data.weather[0].main == "Mist") {
                weatherIconContainer.innerHTML = '<i class="fa-solid fa-smog"></i>';
            } else {
                console.error("Unexpected weather condition:", data.weather[0].main);
            }

            weatherContainer.style.display = "block";
            errorContainer.style.display = "none";
        }
    }

    searchBtn.addEventListener("click", () => {
        weatherChecker(searchBox.value);
    });
