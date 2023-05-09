import { City } from "./types";

export const addCityToLocalStorage = (city: City) => {
  const currentArray: City[] = JSON.parse(
    localStorage.getItem("cities") || "[]"
  );
  if (currentArray.some((item) => item.id === city.id)) return;
  const updatedArray = [city, ...currentArray];
  localStorage.setItem("cities", JSON.stringify(updatedArray));
};

export const removeCityFromLocalStorage = (id: number | string) => {
  const currentArray: City[] = JSON.parse(
    localStorage.getItem("cities") || "[]"
  );
  const newArray = JSON.stringify(
    currentArray.filter((item) => item.id !== id)
  );
  localStorage.setItem("cities", newArray);
};

export function invariant(value: unknown): asserts value {
  if (value) return;

  throw new Error("Invariant violation");
}