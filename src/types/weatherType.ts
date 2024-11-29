export type WeatherCondition =
  | "Sunny"
  | "Clear"
  | "Partly cloudy"
  | "Partly Cloudy"
  | "Cloudy"
  | "Overcast"
  | "Patchy rain possible"
  | "Patchy rain nearby"
  | "Light rain"
  | "Moderate rain"
  | "Moderate rain at times"
  | "Heavy rain"
  | "Heavy rain at times"
  | "Moderate or heavy rain shower"
  | "Moderate or heavy rain with thunder"
  | "Mist"
  | "Patchy snow possible"
  | "Patchy sleet possible"
  | "Patchy freezing drizzle possible"
  | "Thundery outbreaks possible"
  | "Blowing snow"
  | "Blizzard"
  | "Fog"
  | "Freezing fog"
  | "Patchy light drizzle"
  | "Light drizzle"
  | "Freezing drizzle"
  | "Heavy freezing drizzle"
  | "Patchy light rain"
  | "Light freezing rain"
  | "Moderate or heavy freezing rain"
  | "Light sleet"
  | "Moderate or heavy sleet"
  | "Patchy light snow"
  | "Light snow"
  | "Patchy moderate snow"
  | "Moderate snow"
  | "Patchy heavy snow"
  | "Heavy snow"
  | "Ice pellets"
  | "Light rain shower"
  | "Torrential rain shower"
  | "Light sleet showers"
  | "Moderate or heavy sleet showers"
  | "Light snow showers"
  | "Moderate or heavy snow showers"
  | "Light showers of ice pellets"
  | "Moderate or heavy showers of ice pellets"
  | "Patchy light rain with thunder"
  | "Patchy light snow with thunder"
  | "Moderate or heavy snow with thunder"
  | "other";

export type WeatherImages = {
  [key in WeatherCondition]: any;
};

export type ForecastParams = {
  cityName: string;
  days: number | string;
};

export type WeatherType = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
        };
      };
      astro: {
        sunrise: string;
      };
    }>;
  };
};
