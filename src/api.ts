import axios from "axios";

const GEO_DB_API_KEY = "a38df4ccbbmsh7b9e682ab5d83d9p1992e8jsn5af3d4d3511e";
const GEO_DB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const OPEN_WEATHER_API_KEY = "66945ce441b315bf9cef041cd56daeb3";

interface CityGeoDB {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  countryCode: string;
}

const DUMMY_CITIES = [
  {
    id: 3386644,
    wikiDataId: "Q3694483",
    name: "Ab Band District",
    country: "Afghanistan",
    countryCode: "AF",
    region: "Ghazni",
    regionCode: "GHA",
    latitude: 32.983,
    longitude: 67.967,
    population: 0,
  },
  {
    id: 3228129,
    wikiDataId: "Q1650529",
    name: "Achin",
    country: "Afghanistan",
    countryCode: "AF",
    region: "Nangarhar",
    regionCode: "NAN",
    latitude: 34.0894,
    longitude: 70.683,
    population: 0,
  },
  {
    id: 3223788,
    wikiDataId: "Q2674014",
    name: "Ajristan District",
    country: "Afghanistan",
    countryCode: "AF",
    region: "Ghazni",
    regionCode: "GHA",
    latitude: 33.466962,
    longitude: 67.238846,
    population: 0,
  },
];

type CityResponse = { data: CityGeoDB[] };

const options = {
  url: GEO_DB_API_URL,

  headers: {
    "X-RapidAPI-Key": GEO_DB_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getCities = async (namePrefix?: string) => {
  return { data: DUMMY_CITIES };
  // try {
  //   const { data } = await axios.get<CityResponse>(GEO_DB_API_URL, {
  //     ...options,
  //     params: {
  //       minPopulation: "150000",
  //       namePrefix,
  //     },
  //   });
  //   return data;
  // } catch (error) {
  //   console.error(error);
  // }
};

export const getCurrentWeather = async (
  latitude: string,
  longitude: string
) => {
  try {
    const { data } = await axios.get<any>(OPEN_WEATHER_API_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: OPEN_WEATHER_API_KEY,
        units: "metric",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
};
