
class WeatherService {
    private weatherData: string;

    constructor() { this.weatherData = "" }

    public async getWeather(latitude: number, longitude: number) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain`)

        this.weatherData = await response.json();

        return this.weatherData;
    }
}

const weatherService = new WeatherService();
export default weatherService;