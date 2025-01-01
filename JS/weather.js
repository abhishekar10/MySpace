const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = '9db02983ca97c4017646c34ffa398122';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperature = data.main.temp;
        console.log(data.main.temp);
        const rain = data.rain ? data.rain['1h'] : 0;
        console.log(rain);
        const place = data.name;
        console.log(data.name);
        // updateWeatherDisplay(temperature, rain, place);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

const tempRefresh = () => {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherData(latitude, longitude);
        },
        (error) => {
            console.error('Error fetching location:', error);
        }
    );
}

// tempRefresh();