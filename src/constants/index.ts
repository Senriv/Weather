import { WeatherCondition, WeatherImages } from "../types/weather";

export const apiKey:string = "9bc6c0ecf69e46af868215854242411";

export const weatherImages: WeatherImages = {
  "Sunny": require("../../assets/images/sun.png"),
  "Clear": require("../../assets/images/clear.png"),
  "Partly cloudy": require("../../assets/images/partlycloudy.png"),
  "Partly Cloudy": require("../../assets/images/partlycloudy.png"),
  "Cloudy": require("../../assets/images/cloud.png"),
  "Overcast": require("../../assets/images/cloud.png"),
  "Patchy rain possible": require("../../assets/images/moderaterain.png"),
  "Patchy rain nearby": require("../../assets/images/moderaterain.png"),
  "Light rain": require("../../assets/images/moderaterain.png"),
  "Moderate rain": require("../../assets/images/moderaterain.png"),
  "Moderate rain at times": require("../../assets/images/moderaterain.png"),
  "Heavy rain": require("../../assets/images/heavyrain.png"),
  "Heavy rain at times": require("../../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower": require("../../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../../assets/images/heavyrain.png"),
  "Mist": require("../../assets/images/mist.png"), 
  "Patchy snow possible": require("../../assets/images/snow.png"), 
  "Patchy sleet possible": require("../../assets/images/snow.png"), 
  "Patchy freezing drizzle possible": require("../../assets/images/snow.png"), 
  "Thundery outbreaks possible": require("../../assets/images/heavyrain.png"), 
  "Blowing snow": require("../../assets/images/snow.png"),
  "Blizzard": require("../../assets/images/blizzard.png"),
  "Fog": require("../../assets/images/mist.png"),
  "Freezing fog": require("../../assets/images/mist.png"),
  "Patchy light drizzle": require("../../assets/images/moderaterain.png"),
  "Light drizzle": require("../../assets/images/moderaterain.png"),
  "Freezing drizzle": require("../../assets/images/moderaterain.png"),
  "Heavy freezing drizzle": require("../../assets/images/moderaterain.png"),
  "Patchy light rain": require("../../assets/images/moderaterain.png"), 
  "Light freezing rain": require("../../assets/images/moderaterain.png"),
  "Moderate or heavy freezing rain": require("../../assets/images/moderaterain.png"),
  "Light sleet": require("../../assets/images/snow.png"),
  "Moderate or heavy sleet": require("../../assets/images/snow.png"), 
  "Patchy light snow": require("../../assets/images/snow.png"), 
  "Light snow": require("../../assets/images/snow.png"),
  "Patchy moderate snow": require("../../assets/images/snow.png"),
  "Moderate snow": require("../../assets/images/snow.png"), 
  "Patchy heavy snow": require("../../assets/images/snow.png"), 
  "Heavy snow": require("../../assets/images/snow.png"), 
  "Ice pellets": require("../../assets/images/snow.png"),
  "Light rain shower": require("../../assets/images/moderaterain.png"), 
  "Torrential rain shower": require("../../assets/images/heavyrain.png"), 
  "Light sleet showers": require("../../assets/images/snow.png"),
  "Moderate or heavy sleet showers": require("../../assets/images/snow.png"),
  "Light snow showers": require("../../assets/images/snow.png"),
  "Moderate or heavy snow showers": require("../../assets/images/snow.png"),
  "Light showers of ice pellets": require("../../assets/images/snow.png"),
  "Moderate or heavy showers of ice pellets": require("../../assets/images/snow.png"),
  "Patchy light rain with thunder": require("../../assets/images/thunder.png"),
  "Patchy light snow with thunder": require("../../assets/images/thunder.png"),
  "Moderate or heavy snow with thunder": require("../../assets/images/thunder.png"),
  "other": require("../../assets/images/plug.png"),
};

export const getWeatherImage = (condition: string): any => {
  return weatherImages[condition as WeatherCondition] || weatherImages.other;
};
