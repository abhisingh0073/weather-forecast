const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3bb89c4fd65a55d1b35386ca6cabe983";

weatherForm.addEventListener("submit", async event => {
             
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
              const weatherData = await getweatherData(city);
              displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter A City");
    }

});

async function getweatherData(city){
          
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
}

function displayWeatherInfo(data){
  

    const{name: city, 
         main: {temp, humidity}, 
         weather: [{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");
  card.appendChild(cityDisplay);

  tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
  tempDisplay.classList.add("tempDisplay")
  card.appendChild(tempDisplay);

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");
  card.appendChild(humidityDisplay);

  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(weatherEmoji);

  
  

  


}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >=200 && weatherId<300) :
            return "⛈️";

        case (weatherId >=300 && weatherId<400) :
            return "🌧️";

        case (weatherId >=400 && weatherId<500) :
            return "🌦️";

        case (weatherId >=500 && weatherId<600) :
            return "❄️";

        case (weatherId >=600 && weatherId<700) :
            return "❄️";

        case (weatherId >=700 && weatherId<800) :
            return "🌁";

        case (weatherId === 800 ) :
             return "☀️";

        case (weatherId >=801 && weatherId<810) :
            return "⛅";
            default: "?";
    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}