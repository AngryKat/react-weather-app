import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { fetchAddedCities } from "./thunks";
import { City, FetchStatus } from "../../utils/types";

export interface CitiesState {
  [id: number]: City;
  allIds: number[];
  status: FetchStatus;
  error: string | undefined;
}

const initialState: CitiesState = {
  allIds: [],
  status: FetchStatus.idle,
  error: undefined,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers,
  extraReducers(builder) {
    builder
      .addCase(fetchAddedCities.pending, (state) => {
        state.status = FetchStatus.loading;
      })
      .addCase(fetchAddedCities.fulfilled, (state, action) => {
        state.status = FetchStatus.succeeded;
        action.payload.forEach((city) => {
          if (state[city.id]) return;
          state[city.id] = city;
          state.allIds.push(city.id);
        });
      })
      .addCase(fetchAddedCities.rejected, (state, action) => {
        state.status = FetchStatus.failed;
        state.error = action.error.message;
      });
  },
});

export default citiesSlice.reducer;
