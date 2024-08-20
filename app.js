const apiKey = "4cff17bcdd51f671350761d546df73b8";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const apiUrl = `${baseUrl}&q=${city}&appid=${apiKey}`; // Construct the URL dynamically
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if(response.status === 404){
            document.querySelector(".error").style.display = "block"; 
            document.querySelector(".weather").style.display = "none"; 
            return;
        } else {
            // Populate the weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h"; 
    
            // Weather Icon Logic
            if (data.weather[0].main === "Cloud") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/snow.png";
            } 

            // Show the weather details
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("An error occurred:", error);
        document.querySelector(".error").textContent = "An error occurred. Please try again later.";
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none"; 
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
