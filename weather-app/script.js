const apiKey= '76227d909ab9f7631ddfa0640da97b02';
const weatherDisplay =document.getElementById('weatherDisplay');
const useLocationBtn = document.getElementById('useLocation');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const modeToggle = document.getElementById('modeToggle');
const body= document.body;

modeToggle.addEventListener('click', () =>{
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    modeToggle.textContent = body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

useLocationBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      }, () => {
        weatherDisplay.innerHTML = `<p>Failed to get location.</p>`;
      });
    } else {
      weatherDisplay.innerHTML = `<p>Geolocation not supported.</p>`;
    }
  });
  
 
  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
      fetchWeatherByCity(city);
    }
  });
  
  function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
  }
  
  function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
  }
  
  function fetchWeather(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Weather not found');
        return response.json();
      })
      .then(data => {
        const { name, main, weather } = data;
        const temp = main.temp;
        const description = weather[0].description;
        const icon = weather[0].icon;
  
        weatherDisplay.innerHTML = `
          <h2>${name}</h2>
          <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/></p>
          <p><strong>${temp}°C</strong> - ${description}</p>
        `;
      })
      .catch(error => {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }