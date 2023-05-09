import { createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../../utils/types";

export const fetchAddedCities = createAsyncThunk<City[]>(
  "addedCities/fetchAddedCities",
  async () => {
    const currentArray = localStorage.getItem("cities");
    return currentArray === null ? [] : JSON.parse(currentArray) as City[];
  }
);
