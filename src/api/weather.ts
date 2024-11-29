import axios from "axios";
import { apiKey } from "../constants";
import { WeatherType, ForecastParams } from "../types/weatherType";
import { LocationType, LocationParams } from "../types/locationType";

const forecastEndpoint = (params: ForecastParams) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationEndpoint = (params: LocationParams) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async <T>(endpoint: string): Promise<T | null> => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request<T>(options);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};

export const fetchWeatherForecast = async (
  params: ForecastParams
): Promise<WeatherType | null> => {
  return apiCall<WeatherType>(forecastEndpoint(params));
};

export const fetchLocations = async (
  params: LocationParams
): Promise<LocationType[] | null> => {
  return apiCall<LocationType[]>(locationEndpoint(params));
};
