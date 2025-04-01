// select HTML elements in the document
const weather = document.querySelector('.card-weather');

function calculateWindChill(tempC, windSpeedKmh) {
    // Wind chill is only valid if temp is ≤ 10°C and wind speed is ≥ 4.8 km/h
    if (tempC <= 10 || windSpeedKmh > 4.8) {
      return (13.12 + 0.6215 * tempC - 11.37 * Math.pow(windSpeedKmh, 0.16) + 0.3965 * tempC * Math.pow(windSpeedKmh, 0.16)).toFixed(2);
    }
  
    return "N/A"; 
  }
  
function displayResults() {
    // SAmple data:
    const temperatureC = 26;   // Temperature in °C
    const windSpeedKmh = 5;  // Wind speed in km/h
    const condition = 'Partly Cloudy'; // Weather condition
    const windChillC = calculateWindChill(temperatureC, windSpeedKmh);

    let windChillContent = "";
    if (windChillC !== "N/A") {
        windChillContent = `<p><span class="data-label">Wind Chill:</span> ${Math.round(windChillC)} °C</p>`;
    }

    const content = `
        <p><span class="data-label">Temperature:</span> ${temperatureC} °C</p>
        <p><span class="data-label">Conditions:</span> ${condition}</p>
        <p><span class="data-label">Wind:</span> ${windSpeedKmh} km/h</p>
        ${windChillContent}
    `;
    
    weather.innerHTML = content;

}

displayResults();














