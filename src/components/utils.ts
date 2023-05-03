import { City } from "./types";

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
