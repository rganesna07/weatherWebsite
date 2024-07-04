// functionality for when the "compare" button is clicked
// this function gets the user inputs, checks to see if they were actually entered
// and either asks the user to input a city or runs the program if 
// something is put in the city box
window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#compButton").addEventListener("click", function () {
        clearResults(); //clear the div when the button is pressed again
       
        //get all inputs from user
        const cityOne = document.getElementById("city1").value;
        const cityTwo = document.getElementById("city2").value;

        //displays error message to user if one or both cities are missing
        document.getElementById("errorMsg1").textContent = "";
        errorMsg1.style.color = "red";
        
        document.getElementById("errorMsg2").textContent = "";
        errorMsg2.style.color = "red";

        if ((cityOne === "")&&(cityTwo === "")){
            document.getElementById("errorMsg1").textContent = "Please enter a city name.";
            document.getElementById("errorMsg2").textContent = "Please enter a city name.";
            return;
        } else if ((cityOne === "")){
            document.getElementById("errorMsg1").textContent = "Please enter a city name.";
            return;
        } else if ((cityTwo === "")){
            document.getElementById("errorMsg2").textContent = "Please enter a city name.";
            return;
        } 

        const state1 = document.getElementById("states1");
        const stateval1 = state1.value;

        const state2 = document.getElementById("states2");
        const stateval2 = state2.value;

        fetchLatLong(cityOne, stateval1);
    
        fetchLatLong(cityTwo, stateval2);

   
    });
});

//initialize empty string
let url = ""

//fetches the latitude and the longitute
//from the url and then calls the getWeather function
//to get the weather for the lat and long
function fetchLatLong(city, state) {

    const location = "https://geocode.maps.co/search?q=";

    const query = city + "+" + state + "&api_key=664b6a71e6177745035072hob4cce9e";
    const url = location+query;
   

    fetch(url)

    .then( response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        }
        throw new Error('No data exists for the city:');
    })

    .then (result => {
        console.log("result : ",result);
        console.log(result[0].lat);
        console.log(result[0].lon);
        console.log(city);

        getWeather(result[0].lat, result[0].lon, city)
    })
    .catch( error => {
        console.log("The resulting error: ",error);
        displayNoData(city, state); //display error message if city xx is not found
    });
}

//gets the actual weather from open meteo from the link
//and  calls the display function to display the data
function getWeather(lat, lon, city){

    const location = "https://api.open-meteo.com/v1/forecast?";
    const queryCelsius = "latitude=" + lat + "&longitude=" + lon + "&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum";
    const queryFahrenheit = "latitude=" + lat + "&longitude=" + lon + "&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum&temperature_unit=fahrenheit";

   
    //add the url + the query depending on what the user selects
    const tempSelection =  document.querySelector('input[type = radio]:checked').value;

    if (tempSelection === "celsius"){
        url = location + queryCelsius;
        //console.log("c")
    } else if (tempSelection === "fahrenheit"){
        url = location + queryFahrenheit;
        //console.log("f")
    }

    fetch(url)

    .then( response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        }
        throw new Error('No data exists for the city:');
    })
    .then (result => {
        console.log("result for weather : ",result);
        displayForecast(result.daily, city); //display the table 
    })
    .catch( error => {
        console.log("The resulting error: ",error);
    });

}


//displays the forecast by using arrays
//to append a table to the weather display div (in the HTML)
//appends time (day of the week), max and min temp, total rain, and the 
//weather image for the weather code
function displayForecast(weatherData, city) {
    const dataTypes = ["Day", "High", "Low", "Rain Sum", "Outlook"];
    const weather = document.querySelector("#weatherDisplay");

    const time = weatherData.time.slice(0, 5); 
    const maxTemp = weatherData.temperature_2m_max.slice(0, 5);
    const minTemp = weatherData.temperature_2m_min.slice(0, 5);
    const rainSum = weatherData.rain_sum.slice(0, 5);
    const weatherCode = weatherData.weather_code.slice(0, 5);

    let html = `<table><caption class="cities">${city}</caption><tr><th>${dataTypes[0]}</th>`;
    
    time.forEach(date => { //appends day to row 1
        const displayDate = new Date(date);
        const weekDay = displayDate.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
        html += `<td>${weekDay}</td>`; //append
    });

    const appendRow = (label, data) => {
        html += `<tr><th>${label}</th>`;
        data.forEach(item => {
            html += `<td>${item}</td>`;
        });
        html += `</tr>`;
    };

    appendRow(dataTypes[1], maxTemp); //append max temp to row 2
    appendRow(dataTypes[2], minTemp); //append min temp to row 3
    appendRow(dataTypes[3], rainSum.map(rain => `${rain}%`)); //append rain total to row 4


    //append images (weather codes) to row 5
    html += `<tr><th>${dataTypes[4]}</th>`;
    weatherCode.forEach(code => {
        let imgSrc;
        if (code === 0) {
            imgSrc = "images/sunny.png";
        } else if (code >= 1 && code <= 3) {
            imgSrc = "images/suncloud.png";
        } else if (code === 45 || code === 48) {
            imgSrc = "images/foggy.jpeg";
        } else if (code >= 51 && code <= 67) {
            if (code === 56 || code === 57) {
                imgSrc = "images/freezingdrizzle.png";
            } else if (code === 66 || code === 67) {
                imgSrc = "images/freezingdrain.png";
            } else {
                imgSrc = "images/rainy.png";
            }
        } else if (code >= 71 && code <= 77) {
            imgSrc = "images/snow.png";
        } else if (code >= 80 && code <= 82) {
            imgSrc = "images/rainy.png";
        } else if (code === 85 || code === 86) {
            imgSrc = "images/snowy.png";
        } else if (code === 95) {
            imgSrc = "images/thunder.png";
        } else {
            imgSrc = "images/thundrain.png";
        }
        html += `<td><img class="icons" src="${imgSrc}"></td>`;
    });

    html += `</tr></table>`;
    weather.insertAdjacentHTML("beforeend", html);
}

//displays the error message and doesn't display
//the data because the city is unable to be located
function displayNoData(city, state) {

    const departDiv = document.querySelector("#weatherDisplay");

    //passes in the city name that wasn't found and the state that was selected
    let html = `<p>Unable to locate ${city} in ${state}</p>`;
    departDiv.innerHTML += html;

}

//clear
function clearResults() {
    //empty the div
	document.querySelector("#weatherDisplay").innerHTML = "";		
}