import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectSlice = (state: RootState) => {
  return state.cities;
};

export const selectCitiesIds = createDraftSafeSelector(
  selectSlice,
  (state) => state.allIds
);

export const selectCityById = (id: number) =>
  createDraftSafeSelector(selectSlice, (state) => state[id]);
