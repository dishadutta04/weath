// Correctly get the button and input elements
const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

// Use unique variable names for elements
const cityNameElement = document.getElementById("city-name");
const cityTimeElement = document.getElementById("city-time");
const cityTempElement = document.getElementById("city-temp");

// Function to fetch data from the weather API
async function getData(cityName) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=6978a07b8ed34329a67194959243011&q=${cityName}&aqi=yes`
    );
    return await response.json();
}

// Event listener for the button
button.addEventListener("click", async () => {
    const value = input.value.trim(); // Trim spaces from the input
    if (!value) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const result = await getData(value);
        console.log(result);

        // Update the DOM with weather details
        cityNameElement.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTimeElement.innerText = result.location.localtime;
        cityTempElement.innerText = `${result.current.temp_c}°C`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again.");
    }

    // Clear the input field
    input.value = "";
});
