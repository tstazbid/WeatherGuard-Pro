
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd8fe805852msha28863ec34f6763p1d87e6jsnac2222108864',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
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
	let degree = 'km/h';
	const withP = `${h} ${degree}`;
	return withP;
}
function addWay(h) {
	let degree = '°';
	const withP = `${h} ${degree}`;
	return withP;
}

const getWeather = (city) => {
	cityName.innerHTML = city
	locationName.innerHTML = city //this is for show the location on screen button name



	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
	document.getElementById("city").value = "";
	fetch(url, options)
		.then(response => response.json())
		.then(response => {

			console.log(response)

			cloud_pct.innerHTML = response.cloud_pct
			temp.innerHTML = addWithDegree(response.temp)
			feels_like.innerHTML = addWithDegree(response.feels_like)
			humidity.innerHTML = addWithPercent(response.humidity)
			min_temp.innerHTML = addWithDegree(response.min_temp)
			max_temp.innerHTML = addWithDegree(response.max_temp)
			wind_speed.innerHTML = addWithKM(response.wind_speed)
			wind_degrees.innerHTML = addWay(response.wind_degrees)
			sunrise.innerHTML = convertTimestampToTime(response.sunrise);
			sunset.innerHTML = convertTimestampToTime(response.sunset);

			//sunrise.innerHTML = response.sunrise
			//sunset.innerHTML = response.sunset

		})
		.catch(err => console.error(err));
}

submit.addEventListener("click", (e) => {
	e.preventDefault()
	searchCity = city.value;
	sendData(searchCity);
	getWeather(city.value);
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