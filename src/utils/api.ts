import axios, { AxiosInstance } from "axios";
import { CityGeoDB, Coords } from "./types";

const geoDBApiKey = process.env.REACT_APP_GEO_DB_API_KEY;
const geoDBApiUrl = process.env.REACT_APP_GEO_DB_API_URL;
const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const openWeatherApiUrl = process.env.REACT_APP_OPEN_WEATHER_API_URL;

if (!geoDBApiKey || !geoDBApiUrl || !openWeatherApiKey || !openWeatherApiUrl) {
  throw new Error("Missing API keys or URLs");
}

const geoDBApi: AxiosInstance = axios.create({
  baseURL: geoDBApiUrl,
  headers: {
    "X-RapidAPI-Key": geoDBApiKey,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});

const openWeatherApi: AxiosInstance = axios.create({
  baseURL: openWeatherApiUrl,
  params: {
    appid: openWeatherApiKey,
  },
});


type CitiesResponse = { data: CityGeoDB[] };
type CityResponse = { data: CityGeoDB };

export const getCities = async (namePrefix?: string): Promise<CityGeoDB[]> => {
  try {
    const { data } = await geoDBApi.get<CitiesResponse>("/cities", {
      params: {
        minPopulation: "150000",
        namePrefix,
      },
    });
    return data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCity = async (id: string | number): Promise<CityGeoDB> => {
  try {
    const { data } = await geoDBApi.get<CityResponse>(`/cities/${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCurrentWeather = async (coords: Coords) => {
  try {
    const { lat, lon } = coords;
    const { data } = await openWeatherApi.get<any>("/weather", {
      params: {
        lat,
        lon,
        units: "metric",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
export const getForecast = async (coords: Coords) => {
  try {
    const { lat, lon } = coords;
    const { data } = await openWeatherApi.get<any>("/forecast", {
      params: {
        lat,
        lon,
        units: "metric",
        cnt: 5,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
