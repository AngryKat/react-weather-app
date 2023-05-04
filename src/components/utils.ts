import { City } from "./types";

export const addCityToLocalStorage = (city: City) => {
  const currentArray = localStorage.getItem("cities");
  const parsedArray: City[] =
    currentArray === null ? [] : JSON.parse(currentArray);
  if (!!parsedArray.find((item) => item.id === city.id)) return;
  localStorage.setItem("cities", JSON.stringify([...parsedArray, city]));
};

export const removeCityFromLocalStorage = (id: number | string) => {
  const currentArray = localStorage.getItem("cities");
  const parsedArray: City[] =
    currentArray === null ? [] : JSON.parse(currentArray);
  const newArray = JSON.stringify(parsedArray.filter((item) => id !== item.id));
  localStorage.setItem("cities", newArray);
};
