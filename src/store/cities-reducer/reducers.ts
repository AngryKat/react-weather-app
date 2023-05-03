import { PayloadAction } from "@reduxjs/toolkit";
import { City } from "../../components/types";
import { CitiesState } from ".";

const reducers = {
  addCity: (state: CitiesState, action: PayloadAction<{ id: number; cityData: City }>) => {
    const {
      payload: { id, cityData },
    } = action;
    if (state[id]) return;
    state[id] = cityData;
    state.allIds.push(id);
  },
  removeCity: (state: CitiesState, action: PayloadAction<{ id: number }>) => {
    const {
      payload: { id: removedId },
    } = action;
    const removedCityIdIndex = state.allIds.findIndex((id) => id === removedId);
    state.allIds.splice(removedCityIdIndex, 1);
    delete state[removedId];
  },
};
export default reducers;
