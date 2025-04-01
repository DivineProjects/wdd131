// select HTML elements in the document
const temperature = document.querySelector('#temperature');
const condition = document.querySelector('#conditions');
const wind = document.querySelector("#wind");
const windChill = document.querySelector("#wind-chill");

// const url = `//api.openweathermap.org/data/2.5/onecall?lat={49.750265627063186}&lon={6.6315950909878545}&appid={57b35b35ea4398840f483c29f14b8533}';

key = '57b35b35ea4398840f483c29f14b8533';
lattitude = '-20.1525730567213';
longitude = '28.58308545902036';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${key}&units=metric`;
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=20.1525730567213&lon=28.58308545902036&appid=57b35b35ea4398840f483c29f14b8533&units=metric`;

async function apiFetch() {

    // try {
    //     const response = await fetch(url);
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data);
    //         // console.log(data.main.humidity);
    //         displayResults(data); // uncomment when ready
    //     } else {
    //         throw Error(await response.text());
    //     }
    // } catch (error) {
        
    // };

    sourcedata = {
        "coord": {
          "lon": 28.5831,
          "lat": 20.1526
        },
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 25.8,
          "feels_like": 24.83,
          "temp_min": 25.8,
          "temp_max": 25.8,
          "pressure": 1002,
          "humidity": 15,
          "sea_level": 1002,
          "grnd_level": 955
        },
        "visibility": 10000,
        "wind": {
          "speed": 2.85,
          "deg": 174,
          "gust": 2.95
        },
        "clouds": {
          "all": 0
        },
        "dt": 1743468169,
        "sys": {
          "country": "SD",
          "sunrise": 1743479945,
          "sunset": 1743524380
        },
        "timezone": 7200,
        "id": 378389,
        "name": "Northern State",
        "cod": 200
      }

      const data = sourcedata;
            console.log(data.wind.speed
                );
            // console.log(data.main.humidity);
            displayResults(data); // uncomment when ready
};

function displayResults(data) {
    // const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.csv`;
    console.log(data);
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    condition.textContent = `${data.weather[0].description}`;
    console.log(data.weather[0].description);
    windChill.textContent = `${Math.round(data.main.feels_like)} °C`;
    wind.textContent = `${Math.round(data.wind.speed)} km/h`;

    // console.log(data.weather[0].description);
    // weather.innerHTML = `<img src="${iconsrc}" alt="${data.weather[0].description}">  <span id="weather-disc">${data.weather[0].description}</span> <span id="imgWeather">${data.main.temp}&deg;C </span> <br>`;
    // weather.innerHTML = `
    // <span class="setSpan">
    //                 <div class="mainFocust">
    //                     <p class="headerFocust">today</p>
    //                     <div class="iconTempPart">
    //                         <div class="iconTemp">
    //                             <img class="iconTempImg" src="${iconsrc}" alt="${data.weather[0].description}" loading="lazy"></img>
    //                         </div>
    //                         <div class="temp">
    //                             <div class="infoPart topInfo">
    //                                 <div class="temper"> ${Math.round(data.main.temp)}&deg;C</div>
    //                             </div>
    //                         </div>
    //                         <div class="temp">
    //                             <div class="infoPart topInfo">
    //                                 <div class="discWeather">${data.weather[0].description}</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </span>
    // `;
}

apiFetch();






























