export const addCityToLocalStorage = (id: number | string) => {
  const currentArray = localStorage.getItem("cities");
  const parsedArray = currentArray === null ? [] : JSON.parse(currentArray);
  const newArray = JSON.stringify(parsedArray.concat(id));
  localStorage.setItem("cities", newArray);
};

export const removeCityFromLocalStorage = (cityId: number | string) => {
  const currentArray = localStorage.getItem("cities");
  const parsedArray: string[] =
    currentArray === null ? [] : JSON.parse(currentArray);
  const newArray = JSON.stringify(
    parsedArray.filter((id) => cityId !== id)
  );
  localStorage.setItem("cities", newArray);
};