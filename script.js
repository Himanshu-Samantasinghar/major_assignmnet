async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = 'ebdb19e446mshb2b4d9be1fa659dp18d6bfjsn060ceca85700'; // Replace with your actual API key
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    document.getElementById('loader').style.display = 'block';
    document.getElementById('weather').style.display = 'none';

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateWeather(data);
        updateDateTime();
    } catch (error) {
        alert(error.message);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

function updateWeather(data) {
    const weather = data.current;

    document.getElementById('weather').style.display = 'block';
    document.getElementById('city-name').innerText = data.location.name;
    document.getElementById('temperature').innerHTML = `Temperature: ${weather.temp_c}°C`;
    document.getElementById('description').innerText = `Description: ${weather.condition.text}`;
    document.getElementById('humidity').innerText = `Humidity: ${weather.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${weather.wind_kph} kph`;

    const weatherIcon = document.getElementById('weather-icon');
    const sunIcon = weatherIcon.querySelector('.fa-sun');
    const moonIcon = weatherIcon.querySelector('.fa-moon');
    const cloudIcon = weatherIcon.querySelector('.fa-cloud');
    const rainIcon = weatherIcon.querySelector('.fa-cloud-rain');
    const snowIcon = weatherIcon.querySelector('.fa-snowflake');
    const boltIcon = weatherIcon.querySelector('.fa-bolt');
    const windIcon = weatherIcon.querySelector('.fa-wind');

    sunIcon.style.display = 'none';
    moonIcon.style.display = 'none';
    cloudIcon.style.display = 'none';
    rainIcon.style.display = 'none';
    snowIcon.style.display = 'none';
    boltIcon.style.display = 'none';
    windIcon.style.display = 'none';

    if (weather.condition.text.includes("Sunny") || weather.condition.text.includes("Clear")) {
        sunIcon.style.display = 'block';
    } else if (weather.condition.text.includes("Cloudy") || weather.condition.text.includes("Overcast")) {
        cloudIcon.style.display = 'block';
    } else if (weather.condition.text.includes("Rain")) {
        rainIcon.style.display = 'block';
    } else if (weather.condition.text.includes("Snow")) {
        snowIcon.style.display = 'block';
    } else if (weather.condition.text.includes("Thunderstorm")) {
        boltIcon.style.display = 'block';
    } else if (weather.condition.text.includes("Night") || weather.condition.text.includes("Moon")) {
        moonIcon.style.display = 'block';
    }

    if (weather.wind_kph > 0) {
        windIcon.style.display = 'block';
    }
}

function updateDateTime() {
    const now = new Date();
    const dateValue = now.toLocaleDateString();
    const timeValue = now.toLocaleTimeString();
    const yearValue = now.getFullYear();

    document.getElementById('date-value').innerText = dateValue;
    document.getElementById('time-value').innerText = timeValue;
    document.getElementById('year-value').innerText = yearValue;
}