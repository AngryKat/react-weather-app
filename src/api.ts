import axios from "axios";

const GEO_DB_API_KEY = "a38df4ccbbmsh7b9e682ab5d83d9p1992e8jsn5af3d4d3511e";
const GEO_DB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const OPEN_WEATHER_API_KEY = "66945ce441b315bf9cef041cd56daeb3";

export interface CityGeoDB {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  countryCode: string;
}

type CitiesResponse = { data: CityGeoDB[] };
type CityResponse = { data: CityGeoDB };

export const getCities = async (namePrefix?: string) => {
  try {
    const { data } = await axios.get<CitiesResponse>(GEO_DB_API_URL, {
      headers: {
        "X-RapidAPI-Key": GEO_DB_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
      params: {
        minPopulation: "150000",
        namePrefix,
      },
    });
    return data || [];
  } catch (error) {
    console.error(error);
  }
};

export const getCity = async (id: string | number) => {
  try {
    const { data } = await axios.get<CityResponse>(`${GEO_DB_API_URL}/${id}`, {
      headers: {
        "X-RapidAPI-Key": GEO_DB_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    });
    console.log("aaa ", { type: typeof data });
    return data || {};
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentWeather = async (
  latitude: string | number,
  longitude: string | number,
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
};
