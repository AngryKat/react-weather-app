import { useQuery } from "react-query";
import { City } from "./types";
import { getCurrentWeather } from "../api";

export const addCityToLocalStorage = (city: City) => {
  const currentArray = localStorage.getItem("cities");
  const parsedArray = currentArray === null ? [] : JSON.parse(currentArray);
  const newArray = JSON.stringify(parsedArray.concat(city));
  localStorage.setItem("cities", newArray);
};

export const removeCityFromLocalStorage = (cityId: number) => {
  const currentArray = localStorage.getItem("cities");
  const parsedArray: City[] =
    currentArray === null ? [] : JSON.parse(currentArray);
  const newArray = JSON.stringify(
    parsedArray.filter(({ id }) => cityId !== id)
  );
  localStorage.setItem("cities", newArray);
};