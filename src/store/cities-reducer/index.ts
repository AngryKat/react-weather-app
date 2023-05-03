import { createSlice } from "@reduxjs/toolkit";
import { City } from "../../components/types";
import reducers from "./reducers";

export interface CitiesState {
  [id: number]: City;
  allIds: number[];
}

export const citiesSlice = createSlice({
  name: "cities",
  initialState: { allIds: [] } as CitiesState,
  reducers,
});

export default citiesSlice.reducer;
