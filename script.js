const input = document.getElementById("searchInput");
const cityname = document.getElementById("cityname");
const but = document.getElementById("searchBut");

///// list of values
const degElements = [
    document.getElementById("deg0"),
    document.getElementById("deg3"),
    document.getElementById("deg6"),
    document.getElementById("deg9"),
    document.getElementById("deg12"),
    document.getElementById("deg15"),
    document.getElementById("deg18"),
    document.getElementById("deg21"),
    document.getElementById("deg24"),
];

const windElements = [
    document.getElementById("wind0"),
    document.getElementById("wind3"),
    document.getElementById("wind6"),
    document.getElementById("wind9"),
    document.getElementById("wind12"),
    document.getElementById("wind15"),
    document.getElementById("wind18"),
    document.getElementById("wind21"),
    document.getElementById("wind24"),
]

const pressureElements = [
    document.getElementById("pressure0"),
    document.getElementById("pressure3"),
    document.getElementById("pressure6"),
    document.getElementById("pressure9"),
    document.getElementById("pressure12"),
    document.getElementById("pressure15"),
    document.getElementById("pressure18"),
    document.getElementById("pressure21"),
    document.getElementById("pressure24"),
]

const FLElements = [
    document.getElementById("feelslike0"),
    document.getElementById("feelslike3"),
    document.getElementById("feelslike6"),
    document.getElementById("feelslike9"),
    document.getElementById("feelslike12"),
    document.getElementById("feelslike15"),
    document.getElementById("feelslike18"),
    document.getElementById("feelslike21"),
    document.getElementById("feelslike24"),
]

const chanceRainElements = [
    document.getElementById("chanceRain0"),
    document.getElementById("chanceRain3"),
    document.getElementById("chanceRain6"),
    document.getElementById("chanceRain9"),
    document.getElementById("chanceRain12"),
    document.getElementById("chanceRain15"),
    document.getElementById("chanceRain18"),
    document.getElementById("chanceRain21"),
    document.getElementById("chanceRain24"),
]
/////////////////// ostik boss gg top the legend owner of the world's crown

const data1 = document.getElementById("data");
const data2 = document.getElementById("data2");
const data3 = document.getElementById("data3");
const data4 = document.getElementById("data4");
const data5 = document.getElementById("data5");

let cityN = "";

function getCityName() {
    cityN = input.value; 
    cityname.textContent = `Погода у ${cityN}`;
}

function getWeather(numberButton){
    const rnDate = new Date();
    function formatDate(date) {
        return String(date.getDate()).padStart(2, '0');
    }

    data1.textContent = formatDate(rnDate);

    const date2 = new Date(rnDate);
    date2.setDate(rnDate.getDate() + 1);
    data2.textContent = formatDate(date2);

    const date3 = new Date(rnDate);
    date3.setDate(rnDate.getDate() + 2);
    data3.textContent = formatDate(date3);

    const date4 = new Date(rnDate);
    date4.setDate(rnDate.getDate() + 3);
    data4.textContent = formatDate(date4);

    const date5 = new Date(rnDate);
    date5.setDate(rnDate.getDate() + 4);
    data5.textContent = formatDate(date5);


    const currentDate = new Date();
    const targetDate = new Date(currentDate); // Копія поточної дати
    targetDate.setDate(currentDate.getDate() + numberButton);

    const day = String(targetDate.getDate()).padStart(2, '0');
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const year = targetDate.getFullYear(); // Отримати рік


    const formattedDate = `${year}-${month}-${day}`; // Форматування дати
    console.log(formattedDate);

    const apiKey = "cac6bdbbf03f4678830164109242210";
    const days = 5;

    async function fetchWeatherData() {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityN}&days=${days}&aqi=no&alerts=no`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    fetchWeatherData().then(apiResponse => {
        if (apiResponse) {
            const hourlyDataForTargetDate = getHourlyDataForDate(apiResponse, formattedDate);
            updateWeatherDisplay(hourlyDataForTargetDate);
        }
    });
    // Функція для отримання даних з кожних 3 години для вибраної дати
    function getHourlyDataForDate(apiData, date) {
        const hourlyData = [];

        apiData.forecast.forecastday.forEach(day => {
            if (day.date === date) {
                day.hour.forEach(hour => {
                    hourlyData.push({
                        time: hour.time,
                        temp_c: hour.temp_c,
                        wind_kph: hour.wind_kph,
                        pressure_mb: hour.pressure_mb,
                        cloud: hour.cloud,
                        feelslike_c: hour.feelslike_c,
                        will_it_rain: hour.will_it_rain,
                        chance_of_rain: hour.chance_of_rain,
                        will_it_snow: hour.will_it_snow,
                        chance_of_snow: hour.chance_of_snow
                    });
                });
            }
        });

        return hourlyData.filter((_, index) => index % 3 === 0); // кожні 3 год.
    }
    function updateWeatherDisplay(hourlyData) {
        hourlyData.forEach((data, index) => {
            if (degElements[index]) {
                degElements[index].textContent = `${data.temp_c}°C`; // Виводимо температуру
            }
            if (windElements[index]) {
                windElements[index].textContent = `${data.wind_kph}km/h`; // Виводимо температуру
            }
            if (pressureElements[index]) {
                pressureElements[index].textContent = `${data.pressure_mb}mb`; // Виводимо температуру
            }
            if (FLElements[index]) {
                FLElements[index].textContent = `${data.feelslike_c}°C`; // Виводимо температуру
            }
            if (chanceRainElements[index]) {
                chanceRainElements[index].textContent = `${data.chance_of_rain}%`; // Виводимо температуру
            }
        });
    }
}