const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd8fe805852msha28863ec34f6763p1d87e6jsnac2222108864',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

var cities = [];
function loadRecentCities() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cities = JSON.parse(this.responseText);
            for (let i = 0; i < cities.length; i++) {
                console.log(cities[i]);
                getWeather(cities[i], i + 1);
            }
            console.log(cities);
        }
    };

    xhttp.open("GET", "last-five-city.php", true);
    xhttp.send();
}

// sunrise sunset number to time convert
function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 since JavaScript works with milliseconds

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and pad with leading zero if necessary
    const day = ('0' + date.getDate()).slice(-2); // Pad with leading zero if necessary
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); // Pad with leading zero if necessary
    const seconds = ('0' + date.getSeconds()).slice(-2); // Pad with leading zero if necessary
    let period = 'AM'; // Initialize period as AM

    if (hours === 0) {
        hours = 12; // Convert 0 to 12 for 12-hour format
    } else if (hours >= 12) {
        period = 'PM'; // Set period as PM for hours greater than or equal to 12
        if (hours > 12) {
            hours -= 12; // Convert hours greater than 12 to 12-hour format
        }
    }

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${period}`;
    const timeOnly = `${hours}:${minutes} ${period}`;
    return timeOnly;
}
function addWithDegree(temparature) {
    let degree = '°C';
    const withCelcious = `${temparature} ${degree}`;
    return withCelcious;
}
function addWithPercent(h) {
    let degree = '%';
    const withP = `${h} ${degree}`;
    return withP;
}
function addWithKM(h) {
	let degree = 'm/s';
	const withP = `${h} ${degree}`;
	return withP;
}
function addWay(h) {
    let degree = '°';
    const withP = `${h} ${degree}`;
    return withP;
}

const getWeather = (city, index) => {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    fetch(url, options)
        .then(response => response.json())
        .then(response => {

            console.log(response)
            const cityNameElement = document.getElementById(`cityName${index}`);
            const cloudPctElement = document.getElementById(`cloud_pct${index}`);
            const tempElement = document.getElementById(`temp${index}`);
            const feelsLikeElement = document.getElementById(`feels_like${index}`);
            const humidityElement = document.getElementById(`humidity${index}`);
            const minTempElement = document.getElementById(`min_temp${index}`);
            const maxTempElement = document.getElementById(`max_temp${index}`);
            const windSpeedElement = document.getElementById(`wind_speed${index}`);
            const windDegreesElement = document.getElementById(`wind_degrees${index}`);
            const sunriseElement = document.getElementById(`sunrise${index}`);
            const sunsetElement = document.getElementById(`sunset${index}`);

            cityNameElement.innerHTML = city
            cloudPctElement.innerHTML = response.cloud_pct;
            tempElement.innerHTML = addWithDegree(response.temp)
            feelsLikeElement.innerHTML = addWithDegree(response.feels_like)
            humidityElement.innerHTML = addWithPercent(response.humidity)
            minTempElement.innerHTML = addWithDegree(response.min_temp)
            maxTempElement.innerHTML = addWithDegree(response.max_temp)
            windSpeedElement.innerHTML = addWithKM(response.wind_speed)
            windDegreesElement.innerHTML = addWay(response.wind_degrees)
            sunriseElement.innerHTML = convertTimestampToTime(response.sunrise);
            sunsetElement.innerHTML = convertTimestampToTime(response.sunset);
        })
        .catch(err => console.error(err));
}

loadRecentCities();