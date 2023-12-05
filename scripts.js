
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd8fe805852msha28863ec34f6763p1d87e6jsnac2222108864',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd8fe805852msha28863ec34f6763p1d87e6jsnac2222108864',
		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
	}
};

var searchCity;

// send cityname in php file
function sendData(citySend) {
	var valueToSend = citySend;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "store-city.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var response = xhr.responseText;
			console.log("Response:", response);
		}
	};
	xhr.send("data=" + encodeURIComponent(valueToSend));
}


// onno page theke asbe
window.onload = function () {
	var queryParams = new URLSearchParams(window.location.search);
	paisiCity = queryParams.get('cityName');
	searchCity = paisiCity
	//if it is null city name for 1st load
	if (searchCity === null || searchCity === "") {
		searchCity = "Dhaka";
	}
	else {
		sendData(searchCity);
	}
	console.log('City Name come form another page:', searchCity);
	getWeather(searchCity);
};


console.log("Search Value City: " + searchCity);

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

// Function to send air quality data
const sendAirQualityData = () => {
    const airQualityData = {
        co: document.getElementById('co').innerText,
        no2: document.getElementById('no2').innerText,
        o3: document.getElementById('o3').innerText,
        pm25: document.getElementById('pm25').innerText,
        pm10: document.getElementById('pm10').innerText,
		temp: document.getElementById('currTemp').innerText,
		windSpeed: document.getElementById('currWSpeed').innerText,
		windDegree: document.getElementById('currWDegress').innerText,
		hum: document.getElementById('currHum').innerText
    };

    // Send only the required data to Flask endpoint
    fetch('http://localhost:5000/update_air_quality', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(airQualityData),
    })
    .then(response => response.json())
    .then(data => {
        const predictedAQI = data.predicted_aqi;
        const predictedHSI = data.predicted_hsi;

        console.log("Predicted AQI:", predictedAQI);
        console.log("Predicted HSI:", predictedHSI);

        handleResults(predictedAQI, predictedHSI);
    })
    .catch(error => console.error(error));
};

// Function to handle the results
const handleResults = (predictedAQI, predictedHSI) => {

	// working with AQI & HSI values
    console.log("Handling results...");
	//predictedAQI -= 10;
	const roundedAQI = Math.round(predictedAQI);
    const roundedHSI = Math.round(predictedHSI);

	const aqiRanges = [
        { min: -50, max: 50, level: "Good", action: "NO CHANGE needed to your normal outdoor activities." },
        { min: 51, max: 100, level: "Moderate", action: "REDUCE outdoor physical activity if you develop symptoms such as cough or shortness of breath. \nConsider closing windows and doors until outdoor air quality is better.\nFollow the treatment plan recommended by your doctor." },
        { min: 101, max: 150, level: "Unhealthy for Sensitive Groups", action: "AVOID outdoor physical activity if you develop symptoms such as cough or shortness of breath.\nWhen indoors, close windows and doors until outdoor air quality is better.\nFollow the treatment plan recommended by your doctor." },
        { min: 151, max: 200, level: "Unhealthy", action: "Everyone is at risk for eye, skin, and throat irritation as well as respiratory problems." },
        { min: 201, max: 300, level: "Very Unhealthy", action: "STAY INDOORS as much as possible with windows and doors closed until outdoor air quality is better.\nIf you feel that the air in your home is uncomfortable, consider going to a place with cleaner air (such as an air-conditioned building like a library or shopping centre) if it is safe to do so.\nActively monitor symptoms and follow the treatment plan recommended by your doctor.\nHealth warnings of emergency conditions. The entire population is more likely to be affected." },
        { min: 301, max: 500, level: "Hazardous", action: "STAY INDOORS with windows and doors closed until outdoor air quality is better and reduce indoor activity.\nIf you feel that the air in your home is uncomfortable, consider going to a place with cleaner air (such as an air-conditioned building like a library or shopping centre) if it is safe to do so.\nActively monitor symptoms and follow the treatment plan recommended by your doctor." }
    ];

	const hsiRanges = [
        { min: 46, max: Infinity, level: "Extreme Heat Stress", action: "Temporary body cooling, drinking, no physical activity" },
        { min: 38, max: 45, level: "Very Strong Heat Stress", action: "Shaded places, drinking, reduce physical activity" },
        { min: 32, max: 37, level: "Strong Heat Stress", action: "Shaded places, drinking, temporary reduce physical activity" },
        { min: 26, max: 31, level: "Moderate Heat Stress", action: "Drinking" },
        { min: 9, max: 25, level: "No Thermal Stress", action: "Physiological thermoregulation sufficient to keep thermal comfort" },
        { min: 0, max: 8, level: "Slight Cold Stress", action: "Use gloves and hat." },
        { min: -13, max: -1, level: "Moderate Cold Stress", action: "Intensify activity and protect face and extremities against cooling" },
        { min: -27, max: -14, level: "Strong Cold Stress", action: "Intensify activity and protect extremities against cooling, warmer clothing" },
        { min: -40, max: -28, level: "Very Strong Cold Stress", action: "Intensify activity and protect extremities against cooling, warmer clothing, reduce outdoor exposure time" },
        { min: -Infinity, max: -41, level: "Extreme Cold Stress", action: "Stay at home." }
    ];

    // Find the range for predicted AQI
    const aqiRange = aqiRanges.find(range => roundedAQI >= range.min && roundedAQI <= range.max);
	// Find the range for predicted HSI
	const hsiRange = hsiRanges.find(range => roundedHSI >= range.min && roundedHSI <= range.max);

    if (aqiRange && hsiRange) {
        // Take appropriate actions based on the AQI and HSI ranges
        console.log(`Predicted AQI: ${roundedAQI}`);
        console.log(`AQI Level: ${aqiRange.level}`);
        console.log(`Action: ${aqiRange.action}`);
		console.log(`Predicted HSI: ${roundedHSI}`);
        console.log(`HSI Level: ${hsiRange.level}`);
        console.log(`HSI Action: ${hsiRange.action}`);

        document.getElementById('aqiLevel').innerText = `${aqiRange.level}`;
        document.getElementById('aqiAction').innerText = `${aqiRange.action}`;
		document.getElementById('hsiLevel').innerText = `${hsiRange.level}`;
        document.getElementById('hsiAction').innerText = `${hsiRange.action}`;

		setHighlightBoxColor(aqiRange.level, 'aqiLevel');
        setHighlightBoxColor(hsiRange.level, 'hsiLevel');
    } else {
        console.error("Unable to determine AQI or HSI range.");
    }
};

// bg color set function
const setHighlightBoxColor = (level, boxId) => {
    const highlightBox = document.getElementById(boxId);

    switch (level) {
        case 'Good':
            highlightBox.style.backgroundColor = '#00cc00'; // Green color for Good
            break;
        case 'Moderate':
            highlightBox.style.backgroundColor = '#ffcc00'; // Yellow color for Moderate
            break;
        case 'Unhealthy for Sensitive Groups':
            highlightBox.style.backgroundColor = '#ff9900'; // Orange color for Unhealthy for Sensitive Groups
            break;
        case 'Unhealthy':
            highlightBox.style.backgroundColor = '#ff3300'; // Red color for Unhealthy
            break;
        case 'Very Unhealthy':
            highlightBox.style.backgroundColor = '#990099'; // Purple color for Very Unhealthy
            break;
        case 'Hazardous':
            highlightBox.style.backgroundColor = '#990000'; // Maroon color for Hazardous
            break;
        case 'Extreme Heat Stress':
            highlightBox.style.backgroundColor = '#ff0000'; // Red color for Extreme Heat Stress
            break;
        case 'Very Strong Heat Stress':
            highlightBox.style.backgroundColor = '#ff6600'; // Orange color for Very Strong Heat Stress
            break;
        case 'Strong Heat Stress':
            highlightBox.style.backgroundColor = '#ffcc00'; // Yellow color for Strong Heat Stress
            break;
        case 'Moderate Heat Stress':
            highlightBox.style.backgroundColor = '#99cc00'; // Light Green color for Moderate Heat Stress
            break;
        case 'No Thermal Stress':
            highlightBox.style.backgroundColor = '#00cc00'; // Green color for No Thermal Stress
            break;
        case 'Slight Cold Stress':
            highlightBox.style.backgroundColor = '#3366cc'; // Blue color for Slight Cold Stress
            break;
        case 'Moderate Cold Stress':
            highlightBox.style.backgroundColor = '#003366'; // Dark Blue color for Moderate Cold Stress
            break;
        case 'Strong Cold Stress':
            highlightBox.style.backgroundColor = '#000099'; // Darker Blue color for Strong Cold Stress
            break;
        case 'Very Strong Cold Stress':
            highlightBox.style.backgroundColor = '#000033'; // Darkest Blue color for Very Strong Cold Stress
            break;
        case 'Extreme Cold Stress':
            highlightBox.style.backgroundColor = '#000000'; // Black color for Extreme Cold Stress
            break;
        default:
            highlightBox.style.backgroundColor = '#ffffff'; // Default color
            break;
    }
};

// Function to get air quality
const getAirQuality = (city, temparature, windSpeed, windDegrees, humidity) => {
    const airQualityUrl = 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=' + city;
    return fetch(airQualityUrl, options2)
        .then(response => response.json())
        .then(result => {
            console.log(result);
			
			const coConcentration = result['CO']['concentration'];
			const no2Concentration = result['NO2']['concentration'];
			const o3Concentration = result['O3']['concentration'];
			const pm25Concentration = result['PM2.5']['concentration'];
			const pm10Concentration = result['PM10']['concentration'];

			
            // Update HTML elements with the extracted information
			document.getElementById('co').innerText = coConcentration;
            document.getElementById('no2').innerText = no2Concentration;
            document.getElementById('o3').innerText = o3Concentration;
            document.getElementById('pm25').innerText = pm25Concentration;
            document.getElementById('pm10').innerText = pm10Concentration;
			document.getElementById('currTemp').innerText = temparature;
			document.getElementById('currWSpeed').innerText = windSpeed;
			document.getElementById('currWDegress').innerText = windDegrees;
			document.getElementById('currHum').innerText = humidity;
			
			sendAirQualityData();
			//sendAirQualityData(coConcentration, no2Concentration, o3Concentration, pm25Concentration, pm10Concentration, temparature);

        })
        .catch(error => console.error(error));
};


const getWeather = (city) => {
	cityName.innerHTML = city
	locationName.innerHTML = city //this is for show the location on screen button name

	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
	document.getElementById("city").value = "";
	fetch(url, options)
		.then(response => response.json())
		.then(response => {

			console.log(response)

			cloud_pct.innerHTML = response.cloud_pct;
			temp.innerHTML = addWithDegree(response.temp);
			feels_like.innerHTML = addWithDegree(response.feels_like);
			humidity.innerHTML = addWithPercent(response.humidity);
			min_temp.innerHTML = addWithDegree(response.min_temp);
			max_temp.innerHTML = addWithDegree(response.max_temp);
			wind_speed.innerHTML = addWithKM(response.wind_speed);
			wind_degrees.innerHTML = addWay(response.wind_degrees);
			sunrise.innerHTML = convertTimestampToTime(response.sunrise);
			sunset.innerHTML = convertTimestampToTime(response.sunset);

			return getAirQuality(city, response.temp, response.wind_speed, response.wind_degrees, response.humidity);

		})
		.catch(err => console.error(err));
}


submit.addEventListener("click", (e) => {
	e.preventDefault()
	searchCity = city.value;
	sendData(searchCity);
	getWeather(city.value);
	getAirQuality(city.value)
})

//getWeather("Dhaka")
//searchCity="Dhaka";
/*
function submitCity() {
	searchCity = document.getElementById("city").value;
	getWeather(city.value);
}
onclick="submitCity()"
*/
// see google map location

function navigateToPage() {
	var link = "https://www.google.com/maps/place/" + searchCity;
	window.open(link, '_blank');
}
